import {
  getContractStorageInstance,
  getContractInstance,
} from '../constants/appConstants';

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
