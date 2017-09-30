import decodeKeystore from './utils/decodeKeystore';
import { getSignedContract } from './utils/contractInstance';

// gas used = 26497
// gas price average (mainnet) = 25000000000 wei
// 50000 * 25000000000 = 0.001250000000000000 ETH
// need 0.001250000000000000 ETH to process this function
/**
 * Delete sell point, this function withdraw automatically balance escrow to owner
 * @param  {object}  keystore deserialize keystore
 * @param  {[type]}  password
 * @return {Promise}
 */
const withdrawAll = async (keystore, password) => {
  const keys = await decodeKeystore(keystore, password);
  const dtrContractInstance = await getSignedContract(keys);

  return dtrContractInstance
    .withdrawAll({
        from: keys.address,
        gas: 100000,
        gasPrice: 25000000000,
      });
};

export default withdrawAll;
