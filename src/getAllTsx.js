import fetch from 'isomorphic-fetch';
import DetherJson from 'dethercontract/contracts/DetherInterface.json';
import DetherStorageJson from 'dethercontract/contracts/DetherStorage.json';

import { UTILITYWEB3 } from './constants/appConstants';

const etherScanKey = process.env.DETHER_ETHERSCAN_KEY;

/**
 * Get all tsx
 * @param  {string} address ethereum address
 * @param  {number} network network ethereum
 * @return {array} all tsx
 */
const getAllTsx = (address, network) =>
  new Promise((resolve, reject) => {
    const dtr = DetherJson.networks[network.networkNumber].address;
    const storage = DetherStorageJson.networks[network.networkNumber].address;

    fetch(`https://kovan.etherscan.io/api?module=account&action=txlist&address=
      ${address}&startblock=0&endblock=99999999&sort=asc&apikey=${etherScanKey}`)
      .then(res => res.json()).then((transac) => {
        const formatedTsx = transac.result.map((tsx) => ({
          etherscan: `https://kovan.etherscan.io/tx/${tsx.hash}`,
          value: UTILITYWEB3.fromWei(tsx.value, 'ether'),
          to: tsx.to,
          from: tsx.from,
          date: new Date(parseInt(tsx.timeStamp * 1000, 10)).toLocaleString('en-US', { hour12: false }),
          timeStamp: tsx.timeStamp,
          error: tsx.isError === '1',
          receive: tsx.from === address,
          myEther: tsx.contractAddress === dtr || tsx.contractAddress === storage || tsx.to === dtr,
        }));
        fetch(`https://kovan.etherscan.io/api?module=account&action=txlistinternal&address=
          ${address}&startblock=0&endblock=99999999&sort=asc&apikey=${etherScanKey}`)
          .then(res => res.json()).then((iTransac) => {
            const formatedTsx2 = iTransac.result.map((tsx2) => ({
              etherscan: `https://kovan.etherscan.io/tx/${tsx2.hash}`,
              value: UTILITYWEB3.fromWei(tsx2.value, 'ether'),
              to: tsx2.to,
              from: tsx2.from,
              date: new Date(parseInt(tsx2.timeStamp * 1000, 10)).toLocaleString('en-US', { hour12: false }),
              timeStamp: tsx2.timeStamp,
              error: tsx2.isError === '1',
              receive: tsx2.from === address,
              myEther: tsx2.contractAddress === dtr ||
                tsx2.contractAddress === storage || tsx2.to === dtr,
            }));

            const allTsx = formatedTsx2.concat(formatedTsx);
            allTsx.sort((a, b) => b.timeStamp - a.timeStamp);
            resolve(allTsx);
          });
      }).catch((msg) => {
        reject(msg);
      });
  });

export default getAllTsx;
