import Ethers from 'ethers';

import { add0x, isAddr } from './utils/eth';
import DetherUser from './detherUser';
import Wallet from './wallet';
import Contracts from './utils/contracts';
import Providers from './utils/providers';
import Formatters from './utils/formatters';

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
    const [rawTellerPos, rawTellerProfile] = await Promise.all([
      this.contractInstance.getTellerPos(address),
      this.contractInstance.getTellerProfile(address),
    ]);

    if (Ethers.utils.formatEther(rawTellerPos[3]) === '0.0') return null;

    return Object.assign(
      {},
      Formatters.tellerPosFromContract(rawTellerPos),
      Formatters.tellerProfileFromContract(rawTellerProfile),
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
   * @param  {Integer}  zone
   * @param  {array}    zone ethereum addresses
   * @return {Promise<Array>} array of tellers in zone
   */
  async getTellersInZone(zone) {
    if (!Number.isInteger(zone) && !Array.isArray(zone)) throw new TypeError('Invalid zone');

    const zones = !Array.isArray(zone) ? [zone] : zone;
    const result = [];

    await Promise.all(zones.map(async (data) => {
      const tellersInZone = await this.storageInstance.getZone(data);
      result.push(...tellersInZone[0]);
    }));

    if (!result || !result.length) return [];
    const tellers = await Promise.all(result.map(this.getTeller.bind(this)));
    return DetherJS._filterTellerList(tellers).filter(t => zones.indexOf(t.zoneId) >= 0);
  }

  /**
   * Get teller balance in escrow
   * @param  {string} address  Teller ethereum address
   * @return {Promise<Number>} Escrow balance of teller at address
   */
  async getTellerBalance(address) {
    if (!isAddr(address)) throw new TypeError('Invalid ETH address');

    const fullAddress = add0x(address);
    const result = await this.contractInstance.getTellerBalances(fullAddress);

    return Number(Ethers.utils.formatEther(result[0]));
  }
}

DetherJS.Wallet = Wallet;

export default DetherJS;
