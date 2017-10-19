/* global describe it before */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import withdrawAll from '../src/deleteSellPoint';
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

describe('withdrawAll', () => {
  it('should is a function', () => {
    expect(typeof withdrawAll).to.equal('function');
  });

  it('', async () => {
    try {
      const test = await withdrawAll(
        keystore,
        password,
      );
      console.log('test', test);
    } catch (e) {
      console.log('e', e);
    }
  });
});
