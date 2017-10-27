/* global describe it */
import { expect } from 'chai';
import sinon  from 'sinon';
import BigNumber from 'bignumber.js';
import DetherJS from '../../src/detherJs';
import Contracts from '../../src/constants/appConstants';

import contractMock from '../mock/contract';
import storageMock from '../mock/storage';

let dether;

describe.only('detherjs', () => {
  describe('instanciation', () => {
    beforeEach(() => {
      dether = new DetherJS({
        providerUrl: 'http',
      });
    });

    it('should instanciate', () => {
      expect(dether.providerUrl).to.eq('http');
    });

    it('should initialize', async () => {
      const c = sinon.stub(Contracts, 'getDetherContract');
      const s = sinon.stub(Contracts, 'getStorageContract');
      c.returns(0);
      s.returns(1);
      await dether.init();

      expect(dether.contractInstance).to.equal(0);
      expect(dether.storageInstance).to.equal(1);

      c.restore();
      s.restore();
    });
  });

  describe('mocked', () => {
    beforeEach(() => {
      dether = new DetherJS({
        providerUrl: 'http',
      });

      dether.contractInstance = contractMock;
      dether.storageInstance = storageMock;
    });

    it('should get teller', async () => {
      const stubgetTellerPos = sinon.stub(dether.contractInstance, 'getTellerPos');
      stubgetTellerPos.returns([
        new BigNumber(123),
        new BigNumber(456),
        new BigNumber(789),
        new BigNumber(5000000000),
      ]);
      const stubgetTellerProfile = sinon.stub(dether.contractInstance, 'getTellerProfile');
      stubgetTellerProfile.returns([
        new BigNumber(2),
        new BigNumber(6000000000),
        new BigNumber(4),
        '0x4861717279000000000000000000000000000000000000000000000000000000',
        new BigNumber(5),
        new BigNumber(6),
        '0x4861727179000000000000000000000000000000000000000000000000000000',
      ]);

      const teller = await dether.getTeller('addr');

      expect(stubgetTellerPos.calledWith('addr')).to.be.true;
      expect(stubgetTellerProfile.calledWith('addr')).to.be.true;

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

      stubgetTellerPos.restore();
      stubgetTellerProfile.restore();
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

    /*
    TODO
    all tellers: test duplicates
    teller detail

     */
  });
});