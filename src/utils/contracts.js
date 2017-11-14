import Ethers from 'ethers';

import DetherJson from 'dethercontract/contracts/DetherInterface.json';
import DetherStorageJson from 'dethercontract/contracts/DetherStorage.json';

const Contracts = {
  /**
   * @ignore
   */
  getContract(ContractJson, provider) {
    let chainId = null;
    if (provider.provider) {
      chainId = provider.provider.chainId;
    } else {
      chainId = provider.chainId;
    }
    if (!chainId) {
      throw new Error('No chain id found');
    }
    const network = ContractJson.networks[chainId];
    if (!network) {
      throw new Error(`Contract not deployed on network ${chainId}`);
    }
    const contractAddress = network.address;
    const contractABI = ContractJson.abi;

    return new Ethers.Contract(contractAddress, contractABI, provider);
  },

  /**
   * @ignore
   */
  getDetherContract(provider) {
    return Contracts.getContract(DetherJson, provider);
  },

  /**
   * @ignore
   */
  getDetherStorageContract(provider) {
    return Contracts.getContract(DetherStorageJson, provider);
  },

  /**
   * Returns a custom signed contract
   * Allows to add value to a transaction
   *
   * @param {object}      opts
   * @param {object}      opts.wallet   Decrypted user wallet
   * @param {string}      opts.password password to decrypt wallet
   * @param {?BigNumber}  opts.value    Ether value to send while calling contract
   * @return {object}     Dether Contract
   * @private
   * @ignore
   */
  async getCustomContract(opts) {
    if (!opts.password) {
      throw new TypeError('Need password to decrypt wallet');
    }

    const { wallet } = opts;
    const customProvider = {
      getAddress: wallet.getAddress.bind(wallet),
      provider: wallet.provider,
      sendTransaction: (transaction) => {
        if (opts.value) {
          transaction.value = opts.value;
        }
        return wallet.sendTransaction(transaction);
      },
    };

    return Contracts.getDetherContract(customProvider);
  },

};

export default Contracts;
