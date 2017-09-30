import Web3 from 'web3';
import contract from 'truffle-contract';
import DetherJson from 'dethercontract/contracts/DetherInterface.json';

export const GAS_PRICE = 25000000000;

export const PROVIDER_URL = process.env.DETHER_ETHEREUM_PROVIDER;
export const UTILITYWEB3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));

const DetherContract = contract(DetherJson);
DetherContract.setProvider(UTILITYWEB3.currentProvider);

export const getContractInstance = () => DetherContract.deployed();
export const DETHER_CONTRACT = DetherContract;
