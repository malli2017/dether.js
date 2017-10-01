import decodeKeystore from './utils/decodeKeystore';
import { getSignedContract } from './utils/contractInstance';
import add0x from './utils/add0x';
import { UTILITYWEB3 } from './constants/appConstants';

// gas used = 95481
// gas price average (mainnet) = 25000000000 wei
// 115000 * 25000000000 = 0.002875000000000000 ETH
// need 0.006250000000000000 ETH to process this function
/**
 * Send eth from escrow
 * @param  {string}  receiver ethereum address
 * @param  {number}  amount   max balance
 * @param  {object}  keystore deserialise keystore
 * @param  {string}  password
 * @return {Promise}
 */
const dtrSendCoin = async (receiver, amount, keystore, password) => {
  const keys = await decodeKeystore(keystore, password);
  try {
    const dtrContractInstance = await getSignedContract(keys);
    return dtrContractInstance.sendCoin(
      add0x(receiver),
      parseInt(UTILITYWEB3.toWei(amount, 'ether'), 10),
      {
        from: keys.address,
        gas: 200000,
        gasPrice: 25000000000,
      },
    );
  } catch (e) {
    return new TypeError(e);
  }
};

export default dtrSendCoin;
