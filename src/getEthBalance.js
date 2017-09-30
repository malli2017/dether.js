import { UTILITYWEB3 } from './constants/appConstants';

/**
 * Get eth Balance
 * @param  {string} address ethereum address
 * @return {number} return balance
 */
const getEthBalance = address =>
  new Promise((resolve, reject) => {
    UTILITYWEB3.eth.getBalance(address, (err, res) => {
      if (!err) {
        resolve(UTILITYWEB3.fromWei(res, 'ether').toNumber());
      } else {
        reject(new TypeError({ message: err, arg: address }));
      }
    });
  });

export default getEthBalance;
