import ethToolbox from 'eth-toolbox';

// gas used = 26497
// gas price average (mainnet) = 25000000000 wei
// 50000 * 25000000000 = 0.001250000000000000 ETH
// need 0.001250000000000000 ETH to process this function
/**
 * Delete sell point, this function withdraw automatically balance escrow to owner
 * @param  {object}  keystore deserialize keystore
 * @param  {string}  password
 * @return {Promise}
 */
const withdrawAll = (keystore, password) =>
  new Promise(async (res, rej) => {
    const key = await ethToolbox.decodeKeystore(keystore, password);
    if (!key || !key.privateKey || !key.address || !ethToolbox.utils.isAddr(key.address)) {
      return rej(new TypeError('Invalid keystore or password'));
    }
    const dtrContractInstance = await ethToolbox.utils
      .getSignedWeb3(key.privateKey, key.address);

    return res(dtrContractInstance
      .withdrawAll({
          from: key.address,
          gas: 100000,
          gasPrice: 25000000000,
        }));
  });

export default withdrawAll;
