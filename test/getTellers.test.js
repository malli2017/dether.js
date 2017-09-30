/* global describe it */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { getTellersPerZone, getAllTellers } from '../src/getTellers';

chai.use(chaiAsPromised);
chai.should();

const { expect } = chai;

describe('getTellersPerZone', () => {
  it('should is a function', () => {
    expect(typeof getTellersPerZone).to.equal('function');
  });

  it('', async () => {
    try {
      const test = await getTellersPerZone('123');
      console.log('test', test);
    } catch (e) {
      console.log('e', e);
    }
  });
});

describe('getAllTellers', () => {
  it('should is a function', () => {
    expect(typeof getAllTellers).to.equal('function');
  });

  it('', async () => {
    try {
      const test = await getAllTellers();
      console.log('test', test);
    } catch (e) {
      console.log('e', e);
    }
  });
});
