import Ethers from 'ethers';
import Web3 from 'web3';

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
   * @param {String}    providerData.network      Name of network ('homestead', 'ropsten', 'rinkeby', 'kovan')
   * @param {?String}   providerData.rpcURL       JSON RPC provider URL
   * @param {?String}   providerData.infuraKey    INFURA API Key
   * @param {?String}   providerData.etherscanKey Etherscan API Key
   */
  constructor(providerData) {
    /** @ignore */
    this.provider = Providers.getProvider(providerData);
    /** @ignore */
    this.web3 = new Web3();

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

    // TODO real result from contract
    //     if (tellerPos[3].toNumber() === 0) return null; TODO

    const teller = {};

    Object.assign(
      teller,
      Formatters.tellerPosFromContract(rawTellerPos),
      Formatters.tellerProfileFromContract(rawTellerProfile),
      {
        id: address,
        ethAddress: address,
      },
    );

    return teller;
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
   * @return {Promise<Array>} array of tellers
   */
  async getAllTellers() {
    const result = await this.storageInstance.getAllTellers();
    if (!result || !result.length) return [];

    const tellersAddresses = result[0]; // TODO pourquoi ??

    const tellers = await Promise.all(tellersAddresses.map(this.getTeller.bind(this)));

    return DetherJS._filterTellerList(tellers);
  }
  /**
   * Get All tellers per zone
   * @param  {Integer}  zone
   * @return {Promise<Array>} array of tellers in zone
   */
  async getTellersInZone(zone) {
    const result = await this.storageInstance.getZone();
    if (!result || !result.length) return [];

    const tellersAddressesInZone = result[0]; // TODO pourquoi ??

    const zoneInt = zone;
    const tellers = await Promise.all(tellersAddressesInZone.map(this.getTeller.bind(this)));

    return DetherJS._filterTellerList(tellers).filter(t => t.zoneId === zoneInt);
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

    const balance = Ethers.utils.formatEther(result[0]); // TODO pourquoi ??

    // if (Number.isNaN(balance.toNumber())) return 0; // TODO check if work

    return balance;
  }
}

DetherJS.Wallet = Wallet;

export default DetherJS;
