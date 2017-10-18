// import axios from 'axios';
import Web3 from 'web3';
import contract from 'truffle-contract';
import DetherJson from 'dethercontract/contracts/DetherInterface.json';
import DetherStorageJson from 'dethercontract/contracts/DetherStorage.json';

// import detherGateway from '../../src';
// import data from './constants/capitals';
// import { createKeystore, password } from '../../test/utils/createKeystore';
//
// let all = 0;

require('dotenv').config({ path: '.env' });

export const positionToPositionId = position => Math.round(position * (10 ** 5));

// const createSellPoint = () =>
//   new Promise((res, rej) => {
//     createKeystore().then(({ ks, seed }) => {
//       ks.keyFromPassword(password, async (error, pwDerivedKey) => {
//         ks.generateNewAddress(pwDerivedKey, 1);
//         const addr = ks.getAddresses()[0];
//         try {
//           const result = await detherGateway.getEthBalance(addr);
//
//           if (result > 0) {
//             console.log('Done: ', addr, ' amount: ', result, 'Seed: ', seed);
//             rej(all);
//           }
//           res();
//         } catch (e) {
//           rej(all);
//         }
//       });
//     })
//     .catch((e) => {
//       rej(all);
//     });
//   });
//
// const createAll = async () => {
//   while (1) {
//     all += 1;
//     await createSellPoint();
//   }
// };
//
//


const utilityWeb3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v604Wu8pXGoPC41ARh0B'));
const DetherContract = contract(DetherJson);
DetherContract.setProvider(utilityWeb3.currentProvider);
const DetherStorageContract = contract(DetherStorageJson);
DetherStorageContract.setProvider(utilityWeb3.currentProvider);
const getContractInstance = () => DetherContract.deployed();
const getContractStorageInstance = () => DetherStorageContract.deployed();

let i = 0;
export const dtrGetTeller = async (address) => {
  const dtrContractInstance = await getContractInstance();
  const teller = {};
  const tellerPos = await dtrContractInstance.getTellerPos(address);
  // we need to be able to skip element here
  if (tellerPos[3].toNumber() === 0) return null;
  teller.lat = tellerPos[0].toNumber();
  teller.lng = tellerPos[1].toNumber();
  teller.zoneId = tellerPos[2].toNumber();
  teller.escrowBalance = utilityWeb3.fromWei(tellerPos[3].toNumber(), 'ether');
  // teller.escrowBalance = await dtrGetTellerbalances(address);
  const tellerProfile = await dtrContractInstance.getTellerProfile(address);
  // TODO make contract throw when no teller at this address
  teller.rates = tellerProfile[0].toNumber();
  teller.volumeTrade = utilityWeb3.fromWei(tellerProfile[1].toNumber(), 'ether');
  teller.nbTrade = tellerProfile[2].toNumber();
  try {
    teller.name = utilityWeb3.toUtf8(tellerProfile[3]);
  } catch (e) {
    teller.name = 'Dether';
  }
  teller.currencyId = tellerProfile[4].toNumber();
  teller.avatarId = tellerProfile[5].toNumber();
  try {
    teller.messengerAddr = utilityWeb3.toUtf8(tellerProfile[6]);
  } catch (e) {
    teller.messengerAddr = 'Dether';
  }
  teller.ethAddress = address;
  teller.id = `teller_${i}`;
  i += 1;
  return teller;
};

export const dtrGetZone = async (zone) => {
  const dtrContractStorageInstance = await getContractStorageInstance();
  // const tellersAddressesInZone = await dtrContractStorageInstance.getZone.call(zone);
  // TODO: experience
  const tellersAddressesInZone = await dtrContractStorageInstance.getAllTellers();
  const tellers = [];
  let x = 0;
  await Promise.all(tellersAddressesInZone.map(async (datas) => {
    const teller = await dtrGetTeller(datas);

    // TODO: experience
    // if (teller && teller.zoneId === parseInt(zone, 10)) {
    //   console.log(teller);
    //   tellers.push(teller);
    // }
    if (teller) {
      x++;
    }
    // return teller;
  }));
  // return tellers;
  console.log(x);
};

dtrGetZone();
