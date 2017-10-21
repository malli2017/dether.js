/* global describe it before */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import ethToolbox from 'eth-toolbox';

import dtrSendCoin from '../src/tellers/dtrSendCoin';

chai.use(chaiAsPromised);
chai.should();

const { expect } = chai;
let keystore = null;
const password = 'Abcd';

before(async () => {
  try {
  keystore = await ethToolbox.createKeystore(123, password);
  keystore.keyFromPassword(password, (error, pwDerivedKey) => {
      keystore.generateNewAddress(pwDerivedKey, 1);
    });
  } catch (e) {
    console.log('e', e);
  }
});

describe('dtrSendCoin', () => {
  it('should is a function', () => {
    expect(typeof dtrSendCoin).to.equal('function');
  });

  it('should work', async () => {
    try {
      const test = await dtrSendCoin({
        receiver: '0x21243128dc8342e1fbcc0bc212e75a17ce0635a4b',
        amount: 3,
        keystore,
        password,
        provider: 'test',
      });
      expect(typeof test).to.equal('object');
    } catch (e) {
      console.log('e', e);
    }
  });

  it('should crash', async () => {
    try {
      await dtrSendCoin({
        receiver: '0x21243128dc8342e1fbcc0bc212e75a17ce0635a4bBBB',
        amount: 3,
        keystore,
        password,
        provider: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should crash', async () => {
    try {
      await dtrSendCoin({
        receiver: '0x21243128dc8342e1fbcc0bc212e75a17ce0635a4b',
        amount: -2,
        keystore,
        password,
        provider: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should crash', async () => {
    try {
      await dtrSendCoin({
        receiver: '0x21243128dc8342e1fbcc0bc212e75a17ce0635a4b',
        amount: 3,
        keystore: 45,
        password,
        provider: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should crash', async () => {
    try {
      await dtrSendCoin({
        receiver: '0x21243128dc8342e1fbcc0bc212e75a17ce0635a4b',
        amount: 3,
        keystore,
        password: 35,
        provider: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should crash', async () => {
    try {
      await dtrSendCoin({
        receiver: '0x21243128dc8342e1fbcc0bc212e75a17ce0635a4b',
        amount: 3,
        keystore,
        password,
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
});
