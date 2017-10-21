import ethToolbox from 'eth-toolbox';

import { UTILITYWEB3, getSignedContractInstance } from '../constants/appConstants';

const check = (tsx) => {
  if (!tsx.receiver) {
    return { error: true, msg: 'Invalid receiver' };
  }
  if (!tsx.amount || Number.isNaN(tsx.amount) || tsx.amount < 0.001) {
    return { error: true, msg: 'Invalid amount' };
  }
  if (!tsx.keystore || (typeof tsx.keystore) !== 'object') {
    return { error: true, msg: 'No keystore provided' };
  }
  if (!tsx.password || (typeof tsx.password) !== 'string' || tsx.password.length < 1) {
    return { error: true, msg: 'Invalid password' };
  }
  if (!tsx.provider) {
    return { error: true, msg: 'No provider provided' };
  }
  return {};
};

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
 * @param  {string}  provider
 * @return {Promise}
 */
// const dtrSendCoin = async (receiver, amount, keystore, password, provider) =>
const dtrSendCoin = async (tsx) =>
  new Promise(async (res, rej) => {
    const secu = check(tsx);
    if (secu.error) return rej(new TypeError(secu.msg));

    const key = await ethToolbox.decodeKeystore(tsx.keystore, tsx.password);
    if (!key || !key.privateKey || !key.address || !ethToolbox.utils.isAddr(key.address)) {
      return rej(new TypeError('Invalid keystore or password'));
    }

    try {
      const dtrContractInstance = await getSignedContractInstance(key.privateKey, key.address, tsx.provider);
      return res(dtrContractInstance.sendCoin(
        ethToolbox.utils.add0x(tsx.receiver),
        parseInt(UTILITYWEB3.toWei(tsx.amount, 'ether'), 10),
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
