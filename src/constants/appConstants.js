import Web3 from 'web3';
import contract from 'truffle-contract';
import ethToolbox from 'eth-toolbox';
import SignerProvider from 'ethjs-provider-signer';
import { sign } from 'ethjs-signer';

import DetherJson from 'dethercontract/contracts/DetherInterface.json';
import DetherStorageJson from 'dethercontract/contracts/DetherStorage.json';

export const GAS_PRICE = 25000000000;

const Contracts = {
  async getDeployedContract(contractJson, provider) {
    const Contract = contract(contractJson);
    Contract.setProvider(provider);
    return Contract.deployed();
  },

  /**
   * [getDetherContract description]
   * @param  {[type]} provider [description]
   * @return {[type]}          [description]
   */
  async getDetherContract(provider) {
    if (!provider) throw new TypeError('Invalid provider');

    return Contracts.getDeployedContract(DetherJson, provider);
  },
  /**
   * [getStorageContract description]
   * @param  {[type]} provider [description]
   * @return {[type]}             [description]
   */
  async getStorageContract(provider) {
    if (!provider) throw new TypeError('Invalid provider');

    return Contracts.getDeployedContract(DetherStorageJson, provider);
  },

  /**
   * [getSignedContractInstance description]
   * @param  {[type]} privateKey [description]
   * @param  {[type]} address [description]
   * @return {[type]}          [description]
   */
  async getSignedDetherContract(privateKey, address, providerUrl) {
    if (!providerUrl) throw new TypeError('Invalid provider URL');

    const DetherContract = contract(DetherJson);
    const provider = new SignerProvider(providerUrl, {
      signTransaction: (rawTx, cb) => cb(null, sign(rawTx, ethToolbox.add0x(privateKey))),
      accounts: cb => cb(null, address),
    });
    DetherContract.setProvider(provider);
    // TODO

    return res(DetherContract.deployed());
  },
};

export default Contracts;
