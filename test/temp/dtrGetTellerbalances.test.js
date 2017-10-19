/* global describe it */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import dtrGetTellerbalances from '../src/dtrGetTellerbalances';

chai.use(chaiAsPromised);
chai.should();

const { expect } = chai;

describe('dtrGetTellerbalances', () => {
  it('should is a function', () => {
    expect(typeof dtrGetTellerbalances).to.equal('function');
  });

  it('', async () => {
    try {
      const test = await dtrGetTellerbalances('0x21243128dc8342e1fbcc0bc212e75a17ce0635a4b');
      console.log('test', test);
    } catch (e) {
      console.log('e', e);
    }
  });
});
