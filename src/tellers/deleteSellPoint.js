import ethToolbox from 'eth-toolbox';

import { getSignedContractInstance } from '../constants/appConstants';

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
const withdrawAll = (keystore, password, providerUrl) =>
  new Promise(async (res, rej) => {
    if (!keystore) return rej(new TypeError('Invalid keystore'));
    if (!password) return rej(new TypeError('Invalid password'));
    if (!providerUrl) return rej(new TypeError('Invalid provider Url'));

    try {
      const key = await ethToolbox.decodeKeystore(keystore, password);

      if (!key || !key.privateKey || !key.address || !ethToolbox.utils.isAddr(key.address)) {
        return rej(new TypeError('Invalid keystore or password'));
      }

      const dtrContractInstance =
        await getSignedContractInstance(key.privateKey, key.address, providerUrl);

      return res(dtrContractInstance
        .withdrawAll({
            from: key.address,
            gas: 100000,
            gasPrice: 25000000000,
          }));
    } catch (e) {
      return rej(new TypeError(e));
    }
  });

export default withdrawAll;
