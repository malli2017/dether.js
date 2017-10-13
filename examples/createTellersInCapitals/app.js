// import axios from 'axios';
import detherGateway from '../../src';
import data from './constants/capitals';
import { createKeystore, password } from '../../test/utils/createKeystore';

let all = 0;

require('dotenv').config({ path: '.env' });

export const positionToPositionId = position => Math.round(position * (10 ** 5));

const createSellPoint = () =>
  new Promise((res, rej) => {
    createKeystore().then(({ ks, seed }) => {
      ks.keyFromPassword(password, async (error, pwDerivedKey) => {
        ks.generateNewAddress(pwDerivedKey, 1);
        const addr = ks.getAddresses()[0];
        try {
          const result = await detherGateway.getEthBalance(addr);

          if (result > 0) {
            console.log('Done: ', addr, ' amount: ', result, 'Seed: ', seed);
            rej(all);
          }
          res();
        } catch (e) {
          rej(all);
        }
      });
    })
    .catch((e) => {
      rej(all);
    });
  });

const createAll = async () => {
  while (1) {
    all += 1;
    await createSellPoint();
  }
};

createAll();
