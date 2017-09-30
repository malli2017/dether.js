import Web3 from 'web3';

export const GAS_PRICE = 25000000000;

export const PROVIDER_URL = process.env.DETHER_ETHEREUM_PROVIDER;
export const UTILITYWEB3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
