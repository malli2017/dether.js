import data from './constants/seeds';
import { createVault } from '../../test/utils/createKeystore';
import detherGateway from '../../src';

const deleteAccount = elem =>
  new Promise(async (res, rej) => {
    try {
      const ks = await createVault({ password: 'Dether@1', seedPhrase: elem, hdPathString: "m/44'/60'/0'/0" });
      ks.keyFromPassword('Dether@1', async (error, pwDerivedKey) => {
        ks.generateNewAddress(pwDerivedKey, 1);
        try {
          const ds = await detherGateway.withdrawAll(ks, 'Dether@1');
          res(ds);
        } catch (e) {
          rej(e);
        }
      });
    } catch (e) {
      rej(e);
    }
  });


const deleteAll = async () => {
  await Promise.all(data.map(async (elem) => {
    await deleteAccount(elem);
  }));
};

deleteAll();
