import Ethers from 'ethers';

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
  // if (opts.infuraKey) {
  //   providers.push(new Ethers.providers.InfuraProvider(opts.network, opts.infuraKey));
  // }

  providers.push(Ethers.providers.getDefaultProvider(opts.network));
  return new Ethers.providers.FallbackProvider(providers);
}

export default {
  getProvider,
};
