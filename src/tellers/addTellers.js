import ethToolbox from 'eth-toolbox';
import Web3 from 'web3';

import { GAS_PRICE } from '../constants/appConstants';

const check = (teller) => {
  if (!teller.lat || !Number.isInteger(teller.lat) || teller.lat > 90 || teller.lat < 90) {
    return { error: true, msg: 'Invalid latitude' };
  }
  if (!teller.lng || !Number.isInteger(teller.lng) || teller.lng > 180 || teller.lng < 180) {
    return { error: true, msg: 'Invalid longitude' };
  }
  if (!teller.zone || !Number.isInter(teller.zone)) {
    return { error: true, msg: 'Invalid zone' };
  }
  if (!teller.rates || teller.rates < 0 || teller.rates > 100) {
    return { error: true, msg: 'Invalid rates' };
  }
  if (!teller.avatar || !Number.isInter(teller.avatar) || teller.avatar < 0) {
    return { error: true, msg: 'Invalid avatar' };
  }
  if (!teller.currency || !Number.isInter(teller.currency) || teller.currency < 0) {
    return { error: true, msg: 'Invalid currency' };
  }
  if (!teller.telegram || teller.telegram.length < 3 || teller.telegram.length > 30) {
    return { error: true, msg: 'Invalid telegram' };
  }
  if (!teller.amount || !Number.isInter(teller.amount) || teller.amount < 0) {
    return { error: true, msg: 'Invalid amount' };
  }
  if (!teller.username || teller.username.length < 3 || teller.username.length > 30) {
    return { error: true, msg: 'Invalid username' };
  }
  if (!teller.keystore) {
    return { error: true, msg: 'Invalid keystore' };
  }
  if (!teller.password || !teller.password.length < 1) {
    return { error: true, msg: 'Invalid password' };
  }
  if (!teller.providerUrl) {
    return { error: true, msg: 'Invalid provider url' };
  }
  if (!teller.gasPrice || teller.gasPrice < 0) {
    return { error: true, msg: 'Invalid gas Price' };
  }
  return {};
};

// gas used = 223319
// gas price average (mainnet) = 25000000000 wei
// 250000 * 25000000000 = 0.006250000000000000 ETH
// need 0.006250000000000000 ETH to process this function
/**
 * @param {number} lat latitude min -90 max +90
 * @param {number} lng longitude min -180 max +180
 * @param {string} zone geographic zone
 * @param {number} rates Margin (0-100 * 100)
 * @param {number} avatar (1-9)
 * @param {number} currency number (0-4)
 * @param {string} telegam pseudo telegram
 * @param {number} amount escrow
 * @param {string} username username
 * @param {object} keystore deserialize keystore
 * @param {string} password
 * @param {string} providerUrl
 * @param {number}
 * @return {object} Return txs
 */
const dtrRegisterPoint = async (teller) =>
  new Promise(async (res, rej) => {
    const secu = check(teller);
    if (secu.error) return rej(new TypeError(secu.nsg));

    try {
      const keys = await ethToolbox.decodeKeystore(teller.keystore, teller.password);
      const dtrContractInstance = await ethToolbox.utils
        .getSignedWeb3(keys.privateKey, keys.address);

      const utilityWeb3 = new Web3(new Web3.providers.HttpProvider(teller.providerUrl));

      const balance = await utilityWeb3.eth.getBalance(keys.address);

      let tsxAmount = parseInt(utilityWeb3.toWei(teller.amount, 'ether'), 10);

      if (balance.toNumber() < (tsxAmount + (GAS_PRICE * 650000))) {
        tsxAmount = balance.toNumber() - (GAS_PRICE * 650000);
        if (tsxAmount < 0.0025) return rej(new TypeError('Insufficient funds'));
      }

      const result = await dtrContractInstance.registerPoint(
        teller.lat,
        teller.lng,
        teller.zone,
        teller.rates * 100,
        teller.avatar,
        teller.currency,
        teller.telegram,
        teller.username,
        {
          from: ethToolbox.utils.add0x(keys.address),
          value: parseInt(tsxAmount, 10),
          gas: 450000,
          gasPrice: 25000000000,
        },
      );

      return res({
          from: ethToolbox.utils.add0x(keys.address),
          to: dtrContractInstance.address,
          value: teller.amount,
          date: new Date().toLocaleString('en-US', { hour12: false }),
          dether: {
            detherContract: true,
            receive: false,
          },
          etherscan: {
            kovan: `https://kovan.etherscan.io/tx/${result}`,
            ropsten: `https://ropsten.etherscan.io/tx/${result}`,
            ether: `https://etherscan.io/tx/${result}`,
          },
      });
    } catch (e) {
      return rej(new TypeError(e));
    }
  });

export default dtrRegisterPoint;
