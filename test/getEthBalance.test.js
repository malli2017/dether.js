/* global describe it */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import getEthBalance from '../src/getEthBalance';

chai.use(chaiAsPromised);
chai.should();

const { expect } = chai;

describe('getEthBalance', () => {
  it('should is a function', () => {
    expect(typeof getEthBalance).to.equal('function');
  });

  it('', async () => {
    try {
      const test = await getEthBalance('0x21243128dc8342e1fbcc0bc212e75a17ce0635a4b');
      console.log('test', test);
    } catch (e) {
      console.log('e', e);
    }
  });
});
