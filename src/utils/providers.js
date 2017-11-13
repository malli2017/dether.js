import Ethers from 'ethers';

import Contracts from './contracts';

/**
 * Retrieve ethereum provider
 * Only network is needed
 *
 * @param {object}  opts
 * @param {String}  opts.network       Name of network ('homestead', 'ropsten', 'rinkeby', 'kovan')
 * @param {?String} opts.rpcURL       JSON RPC provider URL
 * @param {?String} opts.infuraKey    INFURA API Key
 * @param {?String} opts.etherscanKey Etherscan API Key
 * @return {Provider}
 * @ignore
 */
function getProvider(opts) {
  if (!opts.network) throw new TypeError('Unable to get provider, need network');
  const providers = [];

  if (opts.rpcURL) {
    providers.push(new Ethers.providers.JsonRpcProvider(opts.rpcURL, opts.network));
  }
  if (opts.etherscanKey) {
    providers.push(new Ethers.providers.EtherscanProvider(opts.network, opts.etherscanKey));
  }
  // TODO activate when lib fixed
  // if (opts.infuraKey) {
  //   providers.push(new Ethers.providers.InfuraProvider(opts.network, opts.infuraKey));
  // }

  providers.push(Ethers.providers.getDefaultProvider(opts.network));

  return new Ethers.providers.FallbackProvider(providers);
}

/**
 * Returns decrypted wallet
 *
 * @param {string} password             user password
 * @return {Wallet}     User wallet
 * @private
 * @ignore
 */
async function getWallet(password) {
  if (!password) {
    throw new TypeError('Need password to decrypt wallet');
  }
  const wallet = await Ethers.Wallet.fromEncryptedWallet(this.encryptedWallet, password);
  wallet.provider = this.dether.provider;

  return wallet;
}

/**
 * Returns a custom signed contract
 * Allows to add value to a transaction
 *
 * @param {object}      opts
 * @param {string}      opts.password password to decrypt wallet
 * @param {?BigNumber}  opts.value    Ether value to send while calling contract
 * @return {object}     Dether Contract
 * @private
 * @ignore
 */
async function getCustomContract(opts) {
  if (!opts.password) {
    throw new TypeError('Need password to decrypt wallet');
  }
  const wallet = await getWallet(opts.password);

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
}

export default {
  getProvider,
  getCustomContract,
};
