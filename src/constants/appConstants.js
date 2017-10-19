import Web3 from 'web3';
import contract from 'truffle-contract';
import DetherJson from 'dethercontract/contracts/DetherInterface.json';
// import DetherStorageJson from 'dethercontract/contracts/DetherStorage.json';
import { mock } from '../../test/mock/contract-mock';

export const GAS_PRICE = 25000000000;

export const PROVIDER_URL = process.env.DETHER_ETHEREUM_PROVIDER;
export const UTILITYWEB3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

/**
 * [DetherContract description]
 * @type {[type]}
 */
// const DetherContract = contract(DetherJson);
// DetherContract.setProvider(UTILITYWEB3.currentProvider);
// const DetherStorageContract = contract(DetherStorageJson);
// DetherStorageContract.setProvider(UTILITYWEB3.currentProvider);

/**
 * [getContractStorageInstance description]
 * @return {[type]} [description]
 */
// export const getContractStorageInstance = () => DetherStorageContract.deployed();

/**
 * [getContractInstance description]
 * @return {[type]} [description]
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
