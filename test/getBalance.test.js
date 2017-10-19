/* global describe it */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import getBalance from '../src/tellers/getBalance';

chai.use(chaiAsPromised);
chai.should();

const { expect } = chai;

describe('getBalance', () => {
  it('should getBalance is a function', () => {
    expect(typeof getBalance).to.equal('function');
  });

  it('should works with good arguments', async () => {
    try {
      const test = await getBalance('0x0C6dd5B28707a045f3A0C7429eD3FB9F835Cb623', 'test');
      expect(test).to.equal(1000);
    } catch (e) {
      console.log(e);
      expect(e).to.equal(null);
    }
  });

  it('should works with invalid eth address', async () => {
    try {
      await getBalance('0x0C6dd5B28707a045f3A0C7429eD3FB9F835Cb62', 'test');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should works with invalid eth address', async () => {
    try {
      await getBalance(null, 'test');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should works with invalid eth address', async () => {
    try {
      await getBalance('1x0C6dd5B28707a045f3A0C7429eD3FB9F835Cb62', 'test');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should works with invalid eth address', async () => {
    try {
      await getBalance('0C6dd5B28707a045f3A0C7429eD3FB9F835Cb62', 'test');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should works with invalid provider URL', async () => {
    try {
      await getBalance('0x0C6dd5B28707a045f3A0C7429eD3FB9F835Cb622', null);
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should works with invalid provider URL', async () => {
    try {
      await getBalance('0x0C6dd5B28707a045f3A0C7429eD3FB9F835Cb622', 'https://google.com');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
});
