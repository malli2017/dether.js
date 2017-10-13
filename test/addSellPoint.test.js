/* global describe it before */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import tellers from '../src/tellers';
import { createKeystore, password } from './utils/createKeystore';

require('dotenv').load();

const providerUrl = process.env.PROVIDER_URL;

chai.use(chaiAsPromised);
chai.should();

const { expect } = chai;
let keystore = null;

before((done) => {
  createKeystore().then((ks) => {
    ks.keyFromPassword(password, (error, pwDerivedKey) => {
      ks.generateNewAddress(pwDerivedKey, 1);
      keystore = ks;
      done();
    });
  })
  .catch((e) => {
    console.log(e);
  });
});

describe('dtrRegisterPoint', () => {
  it('should is a function', () => {
    expect(typeof tellers.add).to.equal('function');
  });

  it('', async () => {
    try {
      const tsx = await tellers.add({
        lat: 12,
        lng: 30,
        zone: 123,
        rates: 800,
        avatar: 2,
        currency: 1,
        telegram: 'dether',
        amount: 0.1,
        username: 'dether',
        keystore,
        password,
        providerUrl,
      });
      console.log(tsx);
    } catch (e) {
      console.log('e', e);
    }
  });
});
