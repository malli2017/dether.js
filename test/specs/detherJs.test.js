/* global describe it */
import { expect } from 'chai';
import sinon  from 'sinon';
import TestRPC  from 'ethereumjs-testrpc';
import BigNumber from 'bignumber.js';
import DetherJS from '../../src/detherJs';
import Contracts from '../../src/constants/appConstants';

import contractMock from '../mock/contract';
import storageMock from '../mock/storage';

let dether, provider;

describe.only('detherjs', () => {
  describe('instanciation', () => {
    it('should instanciate with provider', () => {
      provider = TestRPC.provider();
      dether = new DetherJS({
        provider,
      });
      expect(dether.provider.constructor.name).to.eq('Provider');
      expect(dether.web3.constructor.name).to.eq('Web3');
    });

    it('should instanciate with provider URL', () => {
      dether = new DetherJS({
        providerUrl: 'http',
      });
      expect(dether.providerUrl).to.eq('http');
      expect(dether.provider.constructor.name).to.eq('HttpProvider');
      expect(dether.web3.constructor.name).to.eq('Web3');
    });

    it('should initialize', async () => {
      provider = TestRPC.provider();
      dether = new DetherJS({
        provider,
      });

      const c = sinon.stub(Contracts, 'getDetherContract');
      const s = sinon.stub(Contracts, 'getStorageContract');
      c.returns('contractInstance');
      s.returns('storageInstance');

      await dether.init();

      expect(dether.contractInstance).to.equal('contractInstance');
      expect(dether.storageInstance).to.equal('storageInstance');

      c.restore();
      s.restore();
    });
  });

  describe('mocked', () => {
    let dether, stubs = [];

    beforeEach(async () => {
      stubs = [];

      provider = TestRPC.provider();
      dether = new DetherJS({
        provider,
      });

      stubs.push(sinon.stub(Contracts, 'getDetherContract').returns(contractMock));
      stubs.push(sinon.stub(Contracts, 'getStorageContract').returns(storageMock));

      await dether.init();
    });

    afterEach(() => {
      stubs.forEach(s => s.restore());
      stubs = [];
    });

    it('should get teller', async () => {
      stubs.push(sinon.stub(contractMock, 'getTellerPos').returns([
        new BigNumber(123),
        new BigNumber(456),
        new BigNumber(789),
        new BigNumber(5000000000),
      ]));
      stubs.push(sinon.stub(contractMock, 'getTellerProfile').returns([
        new BigNumber(2),
        new BigNumber(6000000000),
        new BigNumber(4),
        '0x4861717279000000000000000000000000000000000000000000000000000000',
        new BigNumber(5),
        new BigNumber(6),
        '0x4861727179000000000000000000000000000000000000000000000000000000',
      ]));

      const teller = await dether.getTeller('addr');

      expect(stubs[2].calledWith('addr')).to.be.true;
      expect(stubs[3].calledWith('addr')).to.be.true;

      expect(teller.id).to.eq('addr');
      expect(teller.ethAddress).to.eq('addr');
      expect(teller.name).to.eq('Haqry');
      expect(teller.messengerAddr).to.eq('Harqy');
      expect(teller.lat).to.eq(0.00123);
      expect(teller.lng).to.eq(0.00456);
      expect(teller.zoneId).to.eq(789);
      expect(teller.escrowBalance).to.eq(5e-9);
      expect(teller.rates).to.eq(2);
      expect(teller.volumeTrade).to.eq(6e-9);
      expect(teller.nbTrade).to.eq(4);
      expect(teller.currencyId).to.eq(5);
      expect(teller.avatarId).to.eq(6);
    });

    it('filter null&duplicates', async () => {
      const list = [
        null,
        { ethAddress: 1 },
        { ethAddress: 2 },
        { ethAddress: 3 },
        undefined,
        { ethAddress: 4 },
        null,
      ];

      const fil = DetherJS._filterTellerList(list);

      expect(fil.length).to.eq(4);
      expect(fil[0].ethAddress).to.eq(1);
      expect(fil[1].ethAddress).to.eq(2);
      expect(fil[2].ethAddress).to.eq(3);
      expect(fil[3].ethAddress).to.eq(4);
    });

    it('should get all tellers', async () => {
      const stub = sinon.stub(dether, 'getTeller');

      stub.onCall(0).returns({ ethAddress: 'a' });
      stub.onCall(1).returns({ ethAddress: 'b' });
      stub.onCall(2).returns({ ethAddress: 'c' });

      const allTellers = await dether.getAllTellers();
      expect(allTellers.length).to.eq(3);
      expect(allTellers[0].ethAddress).to.eq('a');
      expect(allTellers[1].ethAddress).to.eq('b');
      expect(allTellers[2].ethAddress).to.eq('c');

      stub.restore();
    });

    it('should get all tellers without duplicate', async () => {
      const stub = sinon.stub(dether, 'getTeller');

      stub.onCall(0).returns({ ethAddress: 'a' });
      stub.onCall(1).returns({ ethAddress: 'b' });
      stub.onCall(2).returns({ ethAddress: 'a' });

      const allTellers = await dether.getAllTellers();
      expect(allTellers.length).to.eq(2);
      expect(allTellers[0].ethAddress).to.eq('a');
      expect(allTellers[1].ethAddress).to.eq('b');

      stub.restore();
    });

    it('should get all tellers in zone', async () => {
      const stub = sinon.stub(dether, 'getTeller');

      stub.onCall(0).returns({ ethAddress: 'a', zoneId: 42 });
      stub.onCall(1).returns({ ethAddress: 'b', zoneId: 42 });
      stub.onCall(3).returns({ ethAddress: 'c', zoneId: 43 });

      const zone = '42';
      const allTellers = await dether.getTellersInZone(zone);
      expect(allTellers.length).to.eq(2);
      expect(allTellers[0].ethAddress).to.eq('a');
      expect(allTellers[1].ethAddress).to.eq('b');

      stub.restore();
    });

    it('should get all tellers in zone without duplicates', async () => {
      const stub = sinon.stub(dether, 'getTeller');

      stub.onCall(0).returns({ ethAddress: 'a', zoneId: 42 });
      stub.onCall(1).returns({ ethAddress: 'b', zoneId: 42 });
      stub.onCall(2).returns({ ethAddress: 'a', zoneId: 42 });

      const zone = '42';
      const allTellers = await dether.getTellersInZone(zone);
      expect(allTellers.length).to.eq(2);
      expect(allTellers[0].ethAddress).to.eq('a');
      expect(allTellers[1].ethAddress).to.eq('b');

      stub.restore();
    });

    /*
    TODO
    all tellers: test duplicates
    teller detail

     */
  });
});