import Ethers from 'ethers';


import { add0x, isAddr } from './utils/eth';
import DetherUser from './detherUser';
import Contracts from './utils/contracts';
import Providers from './utils/providers';
import Formatters from './utils/formatters';
// to add different stuff on it
import { createMnemonic, encryptMnemonic, decryptMnemonic } from './utils/mnemonic';


/**
 * @example
 * import DetherJS from 'dether.js';
 */
class DetherJS {
  /**
   * Creates an instance of DetherUser
   * You may not instanciate from here, prefer from DetherJS.getUser method
   *
   * @param {object}    providerData
   * @param {String}    providerData.network      Name of network ('homestead',
   *                                              'ropsten', 'rinkeby', 'kovan')
   * @param {?String}   providerData.rpcURL       JSON RPC provider URL
   * @param {?String}   providerData.infuraKey    INFURA API Key
   * @param {?String}   providerData.etherscanKey Etherscan API Key
   */
  constructor(providerData) {
    /** @ignore */
    this.provider = Providers.getProvider(providerData);
    /** @ignore */
    this.contractInstance = Contracts.getDetherContract(this.provider);
    /** @ignore */
    this.storageInstance = Contracts.getDetherStorageContract(this.provider);

    if (!this.contractInstance || !this.storageInstance) throw new Error('Unable to load contracts');
  }

  /**
   * Get instance of DetherUser linked to this Dether instance
   * @param  {object}  encryptedWallet Encrypted user wallet
   * @return {Object} DetherUser
   */
  getUser(encryptedWallet) {
    return new DetherUser({
      encryptedWallet,
      dether: this,
    });
  }

  /**
   * get teller by address
   * @param  {string}  address ethereum address
   * @return {Promise<Object>} teller
   */
  async getTeller(address) {
    const [rawTellerPos, rawTellerProfile1, rawTellerProfile2] = await Promise.all([
      this.storageInstance.getTellerPositionRaw(address),
      this.storageInstance.getTellerProfile1(address),
      this.storageInstance.getTellerProfile2(address),
    ]);
    // if (Ethers.utils.formatEther(rawTellerPos[3]) === '0.0') return null;

    return Object.assign(
      {},
      Formatters.tellerPosFromContract(rawTellerPos),
      Formatters.tellerProfileFromContract1(rawTellerProfile1),
      Formatters.tellerProfileFromContract2(rawTellerProfile2),
      {
        id: address,
        ethAddress: address,
      },
    );
  }

  /**
   * @ignore
   * Filter null and removes tellers with same address
   * @param {Array} list tellers
   * @return {Array} filtered tellers
   */
  static _filterTellerList(list) {
    return list
      .filter(teller => !!teller)
      .reduce(
        (acc, teller) =>
          (!acc.some(t => t.ethAddress === teller.ethAddress) ? [...acc, teller] : acc),
        [],
      );
  }

  /**
   * Get All tellers on the map
   * @param  {array}   addr ethereum addresses
   * @return {Promise<Array>} array of tellers
   */
  async getAllTellers(addrs) {
    if (addrs && !Array.isArray(addrs)) throw new TypeError('Need array of addresses as parameter');
    const result = addrs ? [addrs] : await this.storageInstance.getAllTellers();

    if (!result || !result.length || !Array.isArray(result[0])) return [];

    const tellerAddrList = result[0];

    const tellers = await Promise.all(tellerAddrList.map(this.getTeller.bind(this)));
    return DetherJS._filterTellerList(tellers);
  }

  /**
   * Get All tellers per zone
   * @param {object} opts
   * @param {string} opts.countryId dether instance
   * @param  {Integer}  opts.postalCode
   * @return {Promise<Array>} array of tellers in zone
   */
  async getTellersInZone(opts) {
    if (!Number.isInteger(opts.postalCode) ) throw new TypeError('Invalid zone');
    const tellersInZone = await this.storageInstance.getZone(opts.countryId, opts.postalCode);
    if (!tellersInZone) return [];
    // const tellersList = tellersInZone[0];
    const tellers = await Promise.all(tellersInZone.map(this.getTeller.bind(this)));
    return tellers;
    // return DetherJS._filterTellerList(tellers);
  }

  /**
   * Get teller balance in escrow
   * @param  {string} address  Teller ethereum address
   * @return {Promise<Number>} Escrow balance of teller at address
   */
  async getTellerBalance(address) {
    if (!isAddr(address)) throw new TypeError('Invalid ETH address');
    const fullAddress = add0x(address);
    const result = await this.storageInstance.getTellerBalance(fullAddress);
    return Number(Ethers.utils.formatEther(result[0]));
  }
}

DetherJS.Ethers = Ethers;
DetherJS.createMnemonic = createMnemonic;
DetherJS.encryptMnemonic = encryptMnemonic;
DetherJS.decryptMnemonic = decryptMnemonic;

export default DetherJS;
