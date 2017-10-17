import ethToolbox from 'eth-toolbox';

import { UTILITYWEB3 } from '../constants/appConstants';

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
const dtrSendCoin = async (receiver, amount, keystore, password) =>
  new Promise(async (res, rej) => {
    const key = await ethToolbox.decodeKeystore(keystore, password);

    if (!key || !key.privateKey || !key.address || !ethToolbox.utils.isAddr(key.address)) {
      return rej(new TypeError('Invalid keystore or password'));
    }

    try {
      const dtrContractInstance = await ethToolbox.utils
        .getSignedWeb3(key.privateKey, key.address);

      return res(dtrContractInstance.sendCoin(
        ethToolbox.utils.add0x(receiver),
        parseInt(UTILITYWEB3.toWei(amount, 'ether'), 10),
        {
          from: key.address,
          gas: 200000,
          gasPrice: 25000000000,
        },
      ));
    } catch (e) {
      return rej(new TypeError(e));
    }
  });

export default dtrSendCoin;
