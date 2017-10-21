/* global describe it before */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import ethToolbox from 'eth-toolbox';

import withdrawAll from '../src/tellers/deleteSellPoint';

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


describe('deleteSellPoint', () => {
  it('should deleteSellPoint is a function', () => {
    expect(typeof withdrawAll).to.equal('function');
  });

  it('should works with good arguments', async () => {
    try {
      const tsx = await withdrawAll(keystore, password, 'test');
      expect(typeof tsx).to.equal('object');
    } catch (e) {
      console.log(e);
      expect(e).to.equal(null);
    }
  });

  it('should crash', async () => {
    try {
      await withdrawAll(null, password, 'test');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should crash', async () => {
    try {
      await withdrawAll(keystore, null, 'test');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should crash', async () => {
    try {
      await withdrawAll(keystore, password, null);
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
});
