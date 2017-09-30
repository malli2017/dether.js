/* global describe it before */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import sendEther from '../src/sendEth';
import { createKeystore, password } from './utils/createKeystore';

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

describe('sendEther', () => {
  it('should is a function', () => {
    expect(typeof sendEther).to.equal('function');
  });

  it('', async () => {
    try {
      const test = await sendEther(
        '0x21243128dc8342e1fbcc0bc212e75a17ce0635a4b',
        3,
        keystore,
        password,
      );
      console.log('test', test);
    } catch (e) {
      console.log('e', e);
    }
  });
});
