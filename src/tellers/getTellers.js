import {
  getContractStorageInstance,
  getContractInstance,
  UTILITYWEB3,
} from '../constants/appConstants';

/**
 * get teller by address
 * @param  {string}  address ethereum address
 * @return {object} return teller
 */
export const dtrGetTeller = (address, providerUrl) =>
  new Promise(async (res, rej) => {
    try {
      const dtrContractInstance = await getContractInstance(providerUrl);
      if (!dtrContractInstance) return rej(new TypeError('Invalid provider URL'));

      const tellerPos = await dtrContractInstance.getTellerPos(address);
      if (!tellerPos) return rej(new TypeError('Invalid Teller Position'));

      if (tellerPos[3].toNumber() === 0) return res(null);

      const tellerProfile = await dtrContractInstance.getTellerProfile(address);
      if (!tellerProfile) return rej(new TypeError('Invalid Teller Profile'));

      return res({
        name: UTILITYWEB3.toUtf8(tellerProfile[3]) || 'Dether',
        messengerAddr: UTILITYWEB3.toUtf8(tellerProfile[6]) || 'Dether_io',
        lat: tellerPos[0].toNumber() / (10 ** 6) || 48.864716,
        lng: tellerPos[1].toNumber() / (10 ** 6) || 2.349014,
        zoneId: tellerPos[2].toNumber(),
        escrowBalance: Number(UTILITYWEB3.fromWei(tellerPos[3].toNumber(), 'ether')) || 0,
        rates: tellerProfile[0].toNumber(),
        volumeTrade: Number(UTILITYWEB3.fromWei(tellerProfile[1].toNumber(), 'ether')) || 0,
        nbTrade: tellerProfile[2].toNumber(),
        currencyId: tellerProfile[4].toNumber(),
        avatarId: tellerProfile[5].toNumber(),
        ethAddress: address,
        id: address,
      });
    } catch (e) {
      return rej(new TypeError(e));
    }
  });

/**
 * Get All tellers per zone
 * @param  {string}  zone
 * @return {array} return array of tellers
 */
export const getTellersPerZone = (zone, providerUrl) =>
  new Promise(async (res, rej) => {
    try {
      const dtrContractStorageInstance = await getContractStorageInstance(providerUrl);
      if (!dtrContractStorageInstance) return rej(new TypeError('Invalid provider URL'));

      const tellersAddressesInZone = await dtrContractStorageInstance.getZone.call(zone);
      if (!tellersAddressesInZone || !tellersAddressesInZone.length) return res([]);

      const tellers = [];

      await Promise.all(tellersAddressesInZone.map(async (addr) => {
        const teller = await dtrGetTeller(addr, providerUrl);

        if (teller
            && teller.zoneId === parseInt(zone, 10)
            && !tellers.find((tel) => tel.ethAddress === teller.ethAddress)) {
          tellers.push(teller);
        }
      }));

      return res(tellers);
    } catch (e) {
      return rej(new TypeError(e));
    }
  });

/**
 * Get All tellers on the map
 * @return {array} return array of tellers
 */
export const getAllTellers = (providerUrl) =>
  new Promise(async (res, rej) => {
    try {
      const dtrContractStorageInstance = await getContractStorageInstance(providerUrl);
      if (!dtrContractStorageInstance) return rej(new TypeError('Invalid provider URL'));

      const tellersAddresses = await dtrContractStorageInstance.getAllTellers();
      if (!tellersAddresses || !tellersAddresses.length) return res([]);

      const tellers = [];

      await Promise.all(tellersAddresses.map(async (addr) => {
        const teller = await dtrGetTeller(addr, providerUrl);

        if (teller && !tellers.find((tel) => tel.ethAddress === teller.ethAddress)) {
          tellers.push(teller);
        }
      }));

      return res(tellers);
    } catch (e) {
      return rej(new TypeError(e));
    }
  });
