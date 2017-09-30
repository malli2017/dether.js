import decodeKeystore from './utils/decodeKeystore';
import getSignedWeb3 from './utils/contractInstance';
import { GAS_PRICE, UTILITYWEB3 } from './constants/appConstants';
import add0x from './utils/add0x';

/**
 * Send eth
 * @param  {string} address eth address
 * @param  {number} amount max balance
 * @param  {object} keystore deserialize keystore
 * @param  {string} password
 * @return {object} Return txs
 */
const sendEther = (address, amount, keystore, password) => (
  new Promise(async (resolve, reject) => {
    try {
      const keys = await decodeKeystore(keystore, password);
      const signedWeb3 = getSignedWeb3(keys);
      const balance = await UTILITYWEB3.eth.getBalance(keys.address);

      let tsxAmount = parseInt(UTILITYWEB3.toWei(amount, 'ether'), 10);

      if (balance.toNumber() < (tsxAmount + (GAS_PRICE * 21000))) {
        tsxAmount = balance.toNumber() - (GAS_PRICE * 21000);
      }

      signedWeb3.eth.sendTransaction({
        from: add0x(keys.address),
        to: add0x(address),
        value: parseInt(tsxAmount, 10),
        gas: 21000,
        GAS_PRICE,
      }, (error, hash) => {
        if (!error) {
          const retvalue = {
            from: add0x(keys.address),
            to: add0x(address),
            value: amount,
            date: new Date().toLocaleString('en-US', { hour12: false }),
            receive: 'no',
            myEther: 'no',
            etherscan: `https://kovan.etherscan.io/tx/${hash}`,
          };
          resolve(retvalue);
        } else {
          console.log(error);
          reject(error);
        }
      });
    } catch (error) {
      reject(error);
    }
  })
);

export default sendEther;
