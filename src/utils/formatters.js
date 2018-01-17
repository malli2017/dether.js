import Ethers from 'ethers';

import { COORD_PRECISION } from '../constants/appConstants';
import { toUtf8 } from './eth';
import { validateSellPoint } from './validation';

/**
 * @ignore
 */
const tellerPosFromContract = (rawTellerPos) => {
  try {
    return {
      lat: rawTellerPos[0] / (10 ** COORD_PRECISION),
      lng: rawTellerPos[1] / (10 ** COORD_PRECISION),
      countryId: toUtf8(rawTellerPos[2]),
      postalCode: rawTellerPos[3],
    };
  } catch (e) {
    console.log('error teller pos');
    throw new TypeError(`Invalid teller position: ${e.message}`);
  }
};

/**
 * @ignore
 */
const tellerProfileFromContract = (rawTellerProfile) => {
  try {
    return {
      avatarId: rawTellerProfile.avatarId,
      currencyId: rawTellerProfile.currencyId,
      messengerAddr: toUtf8(rawTellerProfile.messengerAddr),
      messengerAddr2: toUtf8(rawTellerProfile.messengerAddr2),
      rates: rawTellerProfile.rate / 100,
      volumeSell: Number(Ethers.utils.formatEther(rawTellerProfile.volumeSell)),
      volumeBuy: Number(Ethers.utils.formatEther(rawTellerProfile.volumeBuy)),
      nbTrade: rawTellerProfile.nbTrade.toNumber(),
      balance: Number(Ethers.utils.formatEther(rawTellerProfile.balance)),
    };
  } catch (e) {
    console.log('error teller profile', e.message);
    throw new TypeError(`Invalid teller profile: ${e.message}`);
  }
};

/**
 * @ignore
 */
const sellPointToContract = (rawSellPoint) => {
  const validation = validateSellPoint(rawSellPoint);
  if (validation.error) throw new TypeError(validation.msg);

  try {
    return {
      lat: Math.floor(rawSellPoint.lat.toFixed(COORD_PRECISION + 1)
        * (10 ** COORD_PRECISION)),
      lng: Math.floor(rawSellPoint.lng.toFixed(COORD_PRECISION + 1)
        * (10 ** COORD_PRECISION)),
      zone: rawSellPoint.zone,
      rates: Math.floor(rawSellPoint.rates * 100),
      avatar: rawSellPoint.avatar,
      currency: rawSellPoint.currency,
      telegram: Ethers.utils.toUtf8Bytes(rawSellPoint.telegram),
      username: Ethers.utils.toUtf8Bytes(rawSellPoint.username),
    };
  } catch (e) {
    throw new TypeError(`Invalid teller profile: ${e.message}`);
  }
};

export default {
  tellerPosFromContract,
  tellerProfileFromContract,
  sellPointToContract,
};
