/* global describe it */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { getTellersPerZone, getAllTellers } from '../src/tellers/getTellers';

chai.use(chaiAsPromised);
chai.should();

const { expect } = chai;

describe('getTellersPerZone', () => {
  it('should be a function', () => {
    expect(typeof getTellersPerZone).to.equal('function');
  });

  it('should works with good arguments', async () => {
    try {
      const tellers = await getTellersPerZone(123444, 'test');
      expect(tellers.length).to.equal(2);
    } catch (e) {
      console.log(e);
      expect(e).to.equal(null);
    }
  });

  it('should works with good arguments', async () => {
    try {
      const tellers = await getTellersPerZone(123444, 'test');
      expect(tellers[0].name).to.equal('Harry');
      expect(tellers[0].messengerAddr).to.equal('Harry');
      // err
      expect(tellers[0].lat).to.equal(1.23444);
      expect(tellers[0].lng).to.equal(1.23444);
      expect(tellers[0].zoneId).to.equal(123444);
      expect(tellers[0].escrowBalance).to.equal(0.000000000000123444);
      expect(tellers[0].rates).to.equal(123444);
      expect(tellers[0].volumeTrade).to.equal(0.000000000000123444);
      expect(tellers[0].nbTrade).to.equal(123444);
      expect(tellers[0].currencyId).to.equal(123444);
      expect(tellers[0].avatarId).to.equal(123444);
      expect(tellers[0].ethAddress).to.equal('0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623');
      expect(tellers[0].id).to.equal('0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623');
    } catch (e) {
      console.log(e);
      expect(e).to.equal(null);
    }
  });

  it('should works with invalid provider URL', async () => {
    try {
      await getTellersPerZone(123444, null);
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should works with invalid zone', async () => {
    try {
      await getTellersPerZone(null, 'test');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should works without params', async () => {
    try {
      await getTellersPerZone();
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
});

describe('getAllTellers', () => {
  it('should be a function', () => {
    expect(typeof getAllTellers).to.equal('function');
  });

  it('should works with good arguments', async () => {
    try {
      const tellers = await getAllTellers('test');
      expect(tellers.length).to.equal(2);
    } catch (e) {
      console.log(e);
      expect(e).to.equal(null);
    }
  });

  it('should works with good arguments', async () => {
    try {
      const tellers = await getAllTellers('test');
      expect(tellers[0].name).to.equal('Harry');
      expect(tellers[0].messengerAddr).to.equal('Harry');
      // err
      expect(tellers[0].lat).to.equal(1.23444);
      expect(tellers[0].lng).to.equal(1.23444);
      expect(tellers[0].zoneId).to.equal(123444);
      expect(tellers[0].escrowBalance).to.equal(0.000000000000123444);
      expect(tellers[0].rates).to.equal(123444);
      expect(tellers[0].volumeTrade).to.equal(0.000000000000123444);
      expect(tellers[0].nbTrade).to.equal(123444);
      expect(tellers[0].currencyId).to.equal(123444);
      expect(tellers[0].avatarId).to.equal(123444);
      expect(tellers[0].ethAddress).to.equal('0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623');
      expect(tellers[0].id).to.equal('0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623');
    } catch (e) {
      console.log(e);
      expect(e).to.equal(null);
    }
  });

  it('should works with invalid provider URL', async () => {
    try {
      await getAllTellers();
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
});
