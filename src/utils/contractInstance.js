import Web3 from 'web3';
import contract from 'truffle-contract';
import DetherJson from 'dethercontract/contracts/DetherInterface.json';
import SignerProvider from 'ethjs-provider-signer';
import { sign } from 'ethjs-signer';

import add0x from './add0x';

const providerUrl = process.env.DETHER_ETHEREUM_PROVIDER;

/**
 * @param {string} privateKey ethereum private key
 * @param {string} address ethereum address
 * @return {object} return dtrContract instance
 */
export const getSignedContract = (privateKey, address) => {
  if (!privateKey || !address) return null;
  const dtrContract = contract(DetherJson);
  const provider = new SignerProvider('https://kovan.infura.io/v604Wu8pXGoPC41ARh0B', {
    signTransaction: (rawTx, cb) => cb(null, sign(rawTx, add0x(privateKey))),
    accounts: cb => cb(null, address),
  });
  dtrContract.setProvider(provider);
  return dtrContract.deployed();
};

/**
 * get signed web3
 * @param
 * @param.privateKey  {string} privateKey
 * @param.address  {string} address
 * @return {object}
 */
export const getSignedWeb3 = ({ privateKey, address }) => {
  if (!privateKey || !address) return null;
  const provider = new SignerProvider(providerUrl, {
    signTransaction: (rawTx, cb) => cb(null, sign(rawTx, add0x(privateKey))),
    accounts: cb => cb(null, address),
  });
  return new Web3(provider);
};
