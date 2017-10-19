import Web3 from 'web3';
import contract from 'truffle-contract';
import DetherJson from 'dethercontract/contracts/DetherInterface.json';
import DetherStorageJson from 'dethercontract/contracts/DetherStorage.json';
import { mock, mockStorage } from '../../test/mock/contract-mock';

export const GAS_PRICE = 25000000000;

export const PROVIDER_URL = process.env.DETHER_ETHEREUM_PROVIDER;
export const UTILITYWEB3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

/**
 * [getContractInstance description]
 * @param  {[type]} provider [description]
 * @return {[type]}          [description]
 */
export const getContractInstance = (provider) =>
  new Promise(async (res, rej) => {
    if (!provider) return rej(new TypeError('Invalid provider URL'));
    if (provider === 'test') return res(mock.deployed());

    const newProvider = new Web3(new Web3.providers.HttpProvider(provider));
    const DetherContract = contract(DetherJson);

    DetherContract.setProvider(newProvider.currentProvider);
    return res(DetherContract.deployed());
});

/**
 * [getContractStorageInstance description]
 * @param  {[type]} provider [description]
 * @return {[type]}          [description]
 */
export const getContractStorageInstance = (provider) =>
  new Promise(async (res, rej) => {
    if (!provider) return rej(new TypeError('Invalid provider URL'));
    if (provider === 'test') return res(mockStorage.deployed());

    const newProvider = new Web3(new Web3.providers.HttpProvider(provider));
    const DetherStorageContract = contract(DetherStorageJson);

    DetherStorageContract.setProvider(newProvider.currentProvider);
    return res(DetherStorageContract.deployed());
});


// tellerPos:[ { [String: '3642000'] s: 1, e: 6, c: [ 3642000 ] },
//   { [String: '308000'] s: 1, e: 5, c: [ 308000 ] },
//   { [String: '3114'] s: 1, e: 3, c: [ 3114 ] },
//   { [String: '0'] s: 1, e: 0, c: [ 0 ] } ]
//
// tellerProfile: [ { [String: '300'] s: 1, e: 2, c: [ 300 ] },
//   { [String: '0'] s: 1, e: 0, c: [ 0 ] },
//   { [String: '0'] s: 1, e: 0, c: [ 0 ] },
//   '0x4861727279000000000000000000000000000000000000000000000000000000',
//   { [String: '0'] s: 1, e: 0, c: [ 0 ] },
//   { [String: '2'] s: 1, e: 0, c: [ 2 ] },
//   '0x6861727279343039000000000000000000000000000000000000000000000000' ]
