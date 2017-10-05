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
        '0x0C6dd5B28707a045f3A0C7429eD3FB9F835Cb623',
        42,
      );
      console.log('test', test);
    } catch (e) {
      console.log('e', e);
    }
  });
});
