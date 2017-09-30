/* global describe it before */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import dtrRegisterPoint from '../src/addSellPoint';
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

describe('dtrRegisterPoint', () => {
  it('should is a function', () => {
    expect(typeof dtrRegisterPoint).to.equal('function');
  });

  it('', async () => {
    try {
      const test = await dtrRegisterPoint(
        12,
        30,
        '123',
        800,
        2,
        1,
        'dether',
        0.1,
        'dether',
        keystore,
        password,
      );
      console.log('test', test);
    } catch (e) {
      console.log('e', e);
    }
  });
});
