import contract from 'truffle-contract';
import ethToolbox from 'eth-toolbox';
import SignerProvider from 'ethjs-provider-signer';
import { sign } from 'ethjs-signer';

import DetherJson from 'dethercontract/contracts/DetherInterface.json';

export const GAS_PRICE = 25000000000;

const Contracts = {
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
