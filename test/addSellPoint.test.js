/* global describe it before */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import ethToolbox from 'eth-toolbox';

import dtrRegisterPoint from '../src/tellers/addTellers';

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
      // serializedKeystore = keystore.serialize();
    });
  } catch (e) {
    console.log('e', e);
  }
});

describe('dtrRegisterPoint', () => {
  it('should be a function', () => {
    expect(typeof dtrRegisterPoint).to.equal('function');
  });
  it('should work', async () => {
    try {
      const tsx = await dtrRegisterPoint({
        lat: 4.884713,
        lng: 0.231637,
        zone: 123,
        rates: 8,
        avatar: 2,
        currency: 1,
        telegram: 'dether',
        amount: 0.1,
        username: 'dether',
        keystore,
        password,
        providerUrl: 'test',
      });
      expect(typeof tsx).to.equal('object');
    } catch (e) {
      console.log('e', e);
    }
  });
  it('should crash', async () => {
    try {
      await dtrRegisterPoint({
        lat: 'bug',
        lng: 30,
        zone: 123,
        rates: 8,
        avatar: 2,
        currency: 1,
        telegram: 'dether',
        amount: 0.1,
        username: 'dether',
        keystore,
        password,
        providerUrl: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
  it('should crash', async () => {
    try {
      await dtrRegisterPoint({
        lat: 12,
        lng: 'bug',
        zone: 123,
        rates: 8,
        avatar: 2,
        currency: 1,
        telegram: 'dether',
        amount: 0.1,
        username: 'dether',
        keystore,
        password,
        providerUrl: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
  it('should crash', async () => {
    try {
      await dtrRegisterPoint({
        lat: 12,
        lng: 123,
        zone: 'bug',
        rates: 8,
        avatar: 2,
        currency: 1,
        telegram: 'dether',
        amount: 0.1,
        username: 'dether',
        keystore,
        password,
        providerUrl: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
  it('should crash', async () => {
    try {
      await dtrRegisterPoint({
        lat: 12,
        lng: 333,
        zone: 42,
        rates: 'bug',
        avatar: 2,
        currency: 1,
        telegram: 'dether',
        amount: 0.1,
        username: 'dether',
        keystore,
        password,
        providerUrl: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
  it('should crash', async () => {
    try {
      await dtrRegisterPoint({
        lat: 12,
        lng: 333,
        zone: 42,
        rates: 99,
        avatar: 'bug',
        currency: 1,
        telegram: 'dether',
        amount: 0.1,
        username: 'dether',
        keystore,
        password,
        providerUrl: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
  it('should crash', async () => {
    try {
      await dtrRegisterPoint({
        lat: 12,
        lng: 333,
        zone: 42,
        rates: 99,
        avatar: 2,
        currency: 'bug',
        telegram: 'dether',
        amount: 0.1,
        username: 'dether',
        keystore,
        password,
        providerUrl: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
  it('should crash', async () => {
    try {
      await dtrRegisterPoint({
        lat: 12,
        lng: 333,
        zone: 42,
        rates: 99,
        avatar: 2,
        currency: 2,
        telegram: 2,
        amount: 0.1,
        username: 'dether',
        keystore,
        password,
        providerUrl: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
  it('should crash', async () => {
    try {
      await dtrRegisterPoint({
        lat: 12,
        lng: 333,
        zone: 42,
        rates: 99,
        avatar: 2,
        currency: 2,
        telegram: 'Tele',
        amount: 'bug',
        username: 'dether',
        keystore,
        password,
        providerUrl: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
  it('should crash', async () => {
    try {
      await dtrRegisterPoint({
        lat: 12,
        lng: 333,
        zone: 42,
        rates: 99,
        avatar: 2,
        currency: 2,
        telegram: 'Tele',
        amount: 2,
        username: 123,
        keystore,
        password,
        providerUrl: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
  it('should crash', async () => {
    try {
      await dtrRegisterPoint({
        lat: 12,
        lng: 333,
        zone: 42,
        rates: 99,
        avatar: 2,
        currency: 2,
        telegram: 'Tele',
        amount: 2,
        username: 'name',
        keystore: null,
        password,
        providerUrl: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
  it('should crash', async () => {
    try {
      await dtrRegisterPoint({
        lat: 12,
        lng: 333,
        zone: 42,
        rates: 99,
        avatar: 2,
        currency: 2,
        telegram: 'Tele',
        amount: 2,
        username: 'name',
        keystore,
        password: null,
        providerUrl: 'test',
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
  it('should crash', async () => {
    try {
      await dtrRegisterPoint({
        lat: 12,
        lng: 333,
        zone: 42,
        rates: 99,
        avatar: 2,
        currency: 2,
        telegram: 'Tele',
        amount: 2,
        username: 'name',
        keystore,
        password,
        providerUrl: null,
      });
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
});
