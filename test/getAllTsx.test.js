/* global describe it */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import getAllTsx from '../src/getAllTsx';

chai.use(chaiAsPromised);
chai.should();

const { expect } = chai;

describe('getAllTsx ', () => {
  it('should is a function', () => {
    expect(typeof getAllTsx).to.equal('function');
  });

  it('', async () => {
    try {
      const test = await getAllTsx(
        '0x21243128dc8342e1fbcc0bc212e75a17ce0635a4b',
        42,
      );
      console.log('test', test);
    } catch (e) {
      console.log('e', e);
    }
  });
});
