import axios from 'axios';
import detherGateway from '../../src';
import data from './constants/capitals';
import { createKeystore, password } from '../../test/utils/createKeystore';

require('dotenv').config({ path: '.env' });

export const positionToPositionId = position => Math.round(position * (10 ** 5));

const createSellPoint = (elem) =>
  new Promise((res, rej) => {
    createKeystore().then((ks) => {
      ks.keyFromPassword(password, (error, pwDerivedKey) => {
        ks.generateNewAddress(pwDerivedKey, 1);
        const addr = ks.getAddresses()[0];
        axios.post('https://faucet.dether.io/kovan', {
          addr,
        })
          .then(async () => {
            try {
              const result = await detherGateway.dtrRegisterPoint(
                positionToPositionId(elem.lat),
                positionToPositionId(elem.lng),
                elem.zone,
                elem.rates,
                elem.avatar,
                elem.currency,
                elem.telegram,
                elem.amount,
                elem.name,
                ks,
                password,
              );
              res(result);
            } catch (e) {
              rej(e);
            }
          })
          .catch((e) => {
            rej(e);
          });
      });
    })
    .catch((e) => {
      rej(e);
    });
  });

const createAll = async () => {
  await Promise.all(data.map(async (elem) => {
    console.log(elem.capital, ': ');
    await createSellPoint(elem);
  }));
};

createAll();
