import Web3 from 'web3';
import ethToolbox from 'eth-toolbox';

import DetherUser from './detherUser';
import Contracts from './utils/contracts';
import { getProvider } from './utils/providers';


class DetherJS {
  constructor(opts) {
    this.provider = getProvider(opts);
    this.web3 = new Web3();
  }

  async init() {
    this.contractInstance = await Contracts.getDetherContract(this.provider);
    this.storageInstance = await Contracts.getDetherStorageContract(this.provider);

    if (!this.contractInstance || !this.storageInstance) throw new Error('Unable to load contracts');
  }
  /**
   * get teller by address
   * @param  {string}  address ethereum address
   * @return {object} return teller
   */
  async getTeller(address) {
    const tellerPos = await this.contractInstance.getTellerPos(address);
    if (!tellerPos) throw new TypeError('Invalid Teller Position');

    if (tellerPos[3].toNumber() === 0) return null;

    const tellerProfile = await this.contractInstance.getTellerProfile(address);
    if (!tellerProfile) throw new TypeError('Invalid Teller Profile');

    let bug = false;
    let name = 'Dether';
    let messengerAddr = 'Dether_io';
    try {
      name = this.web3.toUtf8(tellerProfile[3]);
    } catch (e) {
      // TODO
      // console.log({
      //   lat: tellerPos[0].toNumber() / (10 ** 5) || 48.864716,
      //   lng: tellerPos[1].toNumber() / (10 ** 5) || 2.349014,
      //   ethAddress: address,
      // });
      bug = true;
      console.error('unable to convert name to utf8', tellerProfile[3])
    }
    try {
      messengerAddr = this.web3.toUtf8(tellerProfile[6]);
    } catch (e) {
      bug = true;
      console.error('unable to convert messenger to utf8', tellerProfile[6])
    }

    const parsedTeller = {
      lat: tellerPos[0].toNumber() / (10 ** 5) || 48.864716,
      lng: tellerPos[1].toNumber() / (10 ** 5) || 2.349014,
      zoneId: tellerPos[2].toNumber(),
      escrowBalance: Number(this.web3.fromWei(tellerPos[3].toNumber(), 'ether')) || 0,
      rates: tellerProfile[0].toNumber(),
      volumeTrade: Number(this.web3.fromWei(tellerProfile[1].toNumber(), 'ether')) || 0,
      nbTrade: tellerProfile[2].toNumber(),
      name,
      currencyId: tellerProfile[4].toNumber(),
      avatarId: tellerProfile[5].toNumber(),
      messengerAddr,
      ethAddress: address,
      id: address,
    };

    if(bug) { console.log('bugged user:', parsedTeller); }

    return parsedTeller;
  }

  static _filterTellerList(list) {
    // Removes null and duplicates
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
   * @return {array} return array of tellers
   */
  async getAllTellers() {
    const tellersAddresses = await this.storageInstance.getAllTellers.call();
    if (!tellersAddresses || !tellersAddresses.length) return [];

    const tellers = await Promise.all(tellersAddresses.map(this.getTeller.bind(this)));

    return DetherJS._filterTellerList(tellers);
  }
  /**
   * Get All tellers per zone
   * @param  {string}  zone
   * @return {array} return array of tellers
   */
  async getTellersInZone(zone) {
    const tellersAddressesInZone = await this.storageInstance.getZone.call(zone);
    if (!tellersAddressesInZone || !tellersAddressesInZone.length) return [];

    const zoneInt = parseInt(zone, 10);
    const tellers = await Promise.all(tellersAddressesInZone.map(this.getTeller.bind(this)));

    return DetherJS._filterTellerList(tellers).filter(t => t.zoneId === zoneInt);
  }

  getUser(keystore) {
    return new DetherUser({
      keystore,
      dether: this,
    });
  }

  /**
   * get dtr balance
   * @param  {string}  address ethereum address
   * @return {Promise}
   */
  async getBalance(address) {
    if (!ethToolbox.utils.isAddr(address)) throw new TypeError('Invalid ETH address');

    const result = await this.contractInstance.getTellerBalances
      .call(ethToolbox.utils.add0x(address));

    if (Number.isNaN(Number(result))) return 0;

    return Number(this.web3.fromWei(result.toNumber(), 'ether'));
  }
}

export default DetherJS;