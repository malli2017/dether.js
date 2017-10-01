import { getContractStorageInstance, getContractInstance, UTILITYWEB3 } from './constants/appConstants';

/**
 * get teller by address
 * @param  {string}  address ethereum address
 * @return {object} return teller
 */
export const dtrGetTeller = async (address) => {
  const teller = {};
  const dtrContractInstance = await getContractInstance();
  const tellerPos = await dtrContractInstance.getTellerPos(address);
  if (tellerPos[3].toNumber() === 0) return null;
  const tellerProfile = await dtrContractInstance.getTellerProfile(address);
  try {
    teller.name = UTILITYWEB3.toUtf8(tellerProfile[3]);
  } catch (e) {
    teller.name = 'Dether';
  }
  try {
    teller.messengerAddr = UTILITYWEB3.toUtf8(tellerProfile[6]);
  } catch (e) {
    teller.messengerAddr = 'Dether';
  }
  return {
    messengerAddr: teller.name,
    name: teller.messengerAddr,
    lat: tellerPos[0].toNumber(),
    lng: tellerPos[1].toNumber(),
    zoneId: tellerPos[2].toNumber(),
    escrowBalance: UTILITYWEB3.fromWei(tellerPos[3].toNumber(), 'ether'),
    rates: tellerProfile[0].toNumber(),
    volumeTrade: UTILITYWEB3.fromWei(tellerProfile[1].toNumber(), 'ether'),
    nbTrade: tellerProfile[2].toNumber(),
    currencyId: tellerProfile[4].toNumber(),
    avatarId: tellerProfile[5].toNumber(),
    ethAddress: address,
    id: address,
  };
};

/**
 * Get All tellers per zone
 * @param  {string}  zone
 * @return {array} return array of tellers
 */
export const getTellersPerZone = async (zone) => {
  const dtrContractStorageInstance = await getContractStorageInstance();
  const tellersAddressesInZone = await dtrContractStorageInstance.getZone.call(zone);
  const tellers = [];
  await Promise.all(tellersAddressesInZone.map(async (data) => {
    const teller = await dtrGetTeller(data);
    if (teller && teller.zoneId === parseInt(zone, 10) && tellers.indexOf(teller)) {
      tellers.push(teller);
    }
  }));
  return tellers;
};

/**
 * Get All tellers on the map
 * @return {array} return array of tellers
 */
export const getAllTellers = async () => {
  const dtrContractStorageInstance = await getContractStorageInstance();
  const tellersAddressesInZone = await dtrContractStorageInstance.getAllTellers();
  const tellers = [];
  await Promise.all(tellersAddressesInZone.map(async (data) => {
    const teller = await dtrGetTeller(data);
    if (teller && tellers.indexOf(teller)) tellers.push(teller);
  }));
  return tellers;
};
