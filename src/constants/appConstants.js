import Web3 from 'web3';
import contract from 'truffle-contract';
import ethToolbox from 'eth-toolbox';
import SignerProvider from 'ethjs-provider-signer';
import { sign } from 'ethjs-signer';

import DetherJson from 'dethercontract/contracts/DetherInterface.json';
import DetherStorageJson from 'dethercontract/contracts/DetherStorage.json';
import { mock, mockStorage } from '../mock/contract-mock';

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

/**
 * [getSignedContractInstance description]
 * @param  {[type]} privateKey [description]
 * @param  {[type]} address [description]
 * @return {[type]}          [description]
 */
export const getSignedContractInstance = (privateKey, address, providerUrl) =>
  new Promise(async (res, rej) => {
    if (!providerUrl) return rej(new TypeError('Invalid provider URL'));
    if (providerUrl === 'test') return res(mock.deployed());
    const DetherContract = contract(DetherJson);
    const provider = new SignerProvider(providerUrl, {
      signTransaction: (rawTx, cb) => cb(null, sign(rawTx, ethToolbox.add0x(privateKey))),
      accounts: cb => cb(null, address),
    });
    DetherContract.setProvider(provider);
    return res(DetherContract.deployed());
  });
