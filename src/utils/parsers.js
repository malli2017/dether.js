import Web3 from 'web3';
import BigNumber from 'bignumber.js';

const COORD_PRECISION = 5;

const web3 = new Web3();

function tellerPosFromContract(rawTellerPos) {
  const tellerPos = {};
  try {
    tellerPos.lat = new BigNumber(rawTellerPos[0]).toNumber() / (10 ** COORD_PRECISION);
    tellerPos.lng = new BigNumber(rawTellerPos[1]).toNumber() / (10 ** COORD_PRECISION);
    tellerPos.zoneId = new BigNumber(rawTellerPos[2]).toNumber();

    tellerPos.escrowBalance = Number(web3.fromWei(new BigNumber(rawTellerPos[3]).toNumber(), 'ether'));
  } catch (e) {
    console.error(e);
    throw new TypeError(`Invalid teller position: ${e.message}`);
  }
  return tellerPos;
}

function tellerProfileFromContract(rawTellerProfile) {
  const tellerProfile = {};
  try {
    tellerProfile.rates = new BigNumber(rawTellerProfile[0]).toNumber();
    tellerProfile.volumeTrade = Number(web3.fromWei(new BigNumber(rawTellerProfile[1]).toNumber(), 'ether'));
    tellerProfile.name = web3.toUtf8(rawTellerProfile[3]);
    tellerProfile.nbTrade = new BigNumber(rawTellerProfile[2]).toNumber();
    tellerProfile.currencyId = new BigNumber(rawTellerProfile[4]).toNumber();
    tellerProfile.avatarId = new BigNumber(rawTellerProfile[5]).toNumber();
    tellerProfile.messengerAddr = web3.toUtf8(rawTellerProfile[6]);
  } catch (e) {
    console.error(e);
    throw new TypeError(`Invalid teller profile: ${e.message}`);
  }
  return tellerProfile;
}

export default {
  tellerPosFromContract,
  tellerProfileFromContract,
};
