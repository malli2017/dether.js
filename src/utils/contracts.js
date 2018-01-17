import Ethers from 'ethers';

import DetherInterfaceJson from 'dethercontract_dev/contracts/DetherInterface.json';
import DetherTellerStorageJson from 'dethercontract_dev/contracts/DetherTellerStorage.json';
import DetherSmsJson from 'dethercontract_dev/contracts/SmsCertifier.json';

import { validateGetCustomContract } from './validation';

const Contracts = {
  /**
   * @ignore
   */
  getContract(ContractJson, provider) {
    if (!ContractJson || !provider) {
      throw new Error('No ContractJson or provider found');
    }

    const chainId = provider.provider ?
                    provider.provider.chainId :
                    provider.chainId;

    if (!chainId) throw new Error('No chain id found');

    const network = ContractJson.networks[chainId];

    if (!network) {
      throw new Error(`Contract not deployed on network ${chainId}`);
    }
    return new Ethers.Contract(network.address, ContractJson.abi, provider);
  },

  /**
   * @ignore
   */
  getDetherContract(provider) {
    if (!provider) throw new Error('No provider found');

    return Contracts.getContract(DetherInterfaceJson, provider);
  },

  /**
   * @ignore
   */
  getDetherStorageContract(provider) {
    if (!DetherTellerStorageJson || !provider) {
      throw new Error('No DetherTellerStorageJson or provider found');
    }

    return Contracts.getContract(DetherTellerStorageJson, provider);
  },

  getDetherSmsContract(provider) {
    if (!DetherSmsJson || !provider) {
      throw new Error('No DetherSmsJson or provider found');
    }

    return Contracts.getContract(DetherSmsJson, provider);
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
    const validation = validateGetCustomContract(opts);
    if (validation.error) throw new TypeError(validation.msg);

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
  async getSmsContract(opts) {
    const validation = validateGetCustomContract(opts);
    if (validation.error) throw new TypeError(validation.msg);

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
    return Contracts.getDetherSmsContract(customProvider);
  },

};

export default Contracts;
