import axios from 'axios';

import detherGateway from '../../src';
import data from './constants/capitals';
import { createKeystore, password } from '../../test/utils/createKeystore';

data.forEach(elem => {
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
              elem.lat,
              elem.lng,
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
            console.log(result);
          } catch (e) {
            console.log(e);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  })
  .catch((e) => {
    console.log(e);
  });
});
