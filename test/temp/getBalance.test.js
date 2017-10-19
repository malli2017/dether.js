/* global describe it */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import getBalance from '../src/tellers/getBalance';

chai.use(chaiAsPromised);
chai.should();

const { expect } = chai;

describe('getBalance', () => {

  it('should works with good arguments', async () => {
    try {
      const test = await getBalance('0x0C6dd5B28707a045f3A0C7429eD3FB9F835Cb623', 'test');
      console.log('test', test);
    } catch (e) {
      console.log('e', e);
    }
  });

  // it('should works with good arguments', async () => {
  //   try {
  //     const test = await getBalance('0x0C6dd5B28707a045f3A0C7429eD3FB9F835Cb623', 'test');
  //     console.log('test', test);
  //   } catch (e) {
  //     console.log('e', e);
  //   }
  // });

});
