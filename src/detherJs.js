import Web3 from 'web3';

import DetherUser from './detherUser';
import Contracts from './constants/appConstants';

class DetherJS {
  constructor(opts) {
    this.providerUrl = opts.providerUrl;
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.providerUrl));
  }

  async init() {
    this.contractInstance = await Contracts.getDetherContract(this.providerUrl);
    this.storageInstance = await Contracts.getStorageContract(this.providerUrl);

    if (!this.contractInstance || !this.storageInstance) throw new Error('Invalid provider URL');
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

  /**
   * Get All tellers on the map
   * @return {array} return array of tellers
   */
  async getAllTellers() {
    const tellersAddresses = await this.storageInstance.getAllTellers();
    if (!tellersAddresses || !tellersAddresses.length) return [];

    return (await Promise.all(tellersAddresses.map(this.getTeller.bind(this))))
      .filter(t => !!t);
    // TODO uniqueness
  }

  getUser(keystore) {
    return new DetherUser({
      keystore,
      dether: this,
    });
  }
}

export default DetherJS;