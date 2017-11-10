/* global describe it */
import { expect } from 'chai';
import sinon from 'sinon';
import DetherJS from '../../src/detherJs';
import Wallet from '../../src/wallet';
import Contracts from '../../src/utils/contracts';
import Providers from '../../src/utils/providers';

import contractMock from '../mock/contract';
import storageMock from '../mock/storage';

describe('dether js', () => {
  describe('instanciation', () => {
    let dether;

    it('should instanciate with provider', () => {
      const p = sinon.stub(Providers, 'getProvider');
      const c = sinon.stub(Contracts, 'getDetherContract');
      const s = sinon.stub(Contracts, 'getDetherStorageContract');

      p.returns('provider');
      c.returns('contractInstance');
      s.returns('storageInstance');

      dether = new DetherJS({
        network: 'ropsten',
      });

      expect(dether.provider).to.eq('provider');

      expect(dether.contractInstance).to.equal('contractInstance');
      expect(dether.storageInstance).to.equal('storageInstance');

      expect(c.calledWith(dether.provider)).to.be.true;
      expect(s.calledWith(dether.provider)).to.be.true;

      p.restore();
      c.restore();
      s.restore();
    });

  });

  describe('calls', () => {
    let dether, stubs = [];

    beforeEach(async () => {
      stubs = [];

      dether = new DetherJS({
        network: 'kovan',
      });

      dether.contractInstance = contractMock;
      dether.storageInstance = storageMock;
    });

    afterEach(() => {
      stubs.forEach(s => s.restore());
      stubs = [];
    });


    it('should get user', async () => {
      const wallet = Wallet.createRandom();
      const encryptedWallet = await wallet.encrypt('password');

      const user = dether.getUser(encryptedWallet);

      expect(user.dether).to.eq(dether);
      expect(user.encryptedWallet).to.eq(encryptedWallet);
    });

    describe('getTeller', () => {
      it('should get teller', async () => {
        stubs.push(sinon.spy(contractMock, 'getTellerPos'));
        stubs.push(sinon.spy(contractMock, 'getTellerProfile'));

        const teller = await dether.getTeller('addr');

        expect(stubs[0].calledWith('addr')).to.be.true;
        expect(stubs[1].calledWith('addr')).to.be.true;

        expect(teller.id).to.eq('addr');
        expect(teller.ethAddress).to.eq('addr');
        expect(teller.name).to.eq('Haqry');
        expect(teller.messengerAddr).to.eq('Harqy');
        expect(teller.lat).to.eq(9.12312);
        expect(teller.lng).to.eq(8.12312);
        expect(teller.zoneId).to.eq(789);
        expect(teller.escrowBalance).to.eq(2.2);
        expect(teller.rates).to.eq(23.13);
        expect(teller.volumeTrade).to.eq(1.2);
        expect(teller.nbTrade).to.eq(12);
        expect(teller.currencyId).to.eq(1);
        expect(teller.avatarId).to.eq(2);
      });
    });

    describe('getTellerBalance', () => {
      it('should be a function', () => {
        expect(typeof dether.getTellerBalance).to.equal('function');
      });

      it('should get user escrow balance', async () => {
        const spy = sinon.spy(contractMock, 'getTellerBalances');
        const balance = await dether.getTellerBalance('0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623');
        expect(balance).to.eq(2.2);
        expect(spy.calledWith('0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623')).to.be.true;
        spy.restore();
      });

      it('should get user escrow balance throw invalid address', async () => {
        expect(dether.getTellerBalance).to.throw;
        expect(dether.getTellerBalance.bind(dether, 'fiezfij')).to.throw;
      });
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

    describe('getAllTellers', () => {
      /*
      TODO
      all tellers: test duplicates
      teller detail
       */

      it('should be a function', () => {
        expect(typeof dether.getAllTellers).to.equal('function');
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
    });

    describe('getTellersInZone', () => {
      it('should be a function', () => {
        expect(typeof dether.getTellersInZone).to.equal('function');
      });


      it('should get all tellers in zone', async () => {
        const stub = sinon.stub(dether, 'getTeller');

        stub.onCall(0).returns({ ethAddress: 'a', zoneId: 42 });
        stub.onCall(1).returns({ ethAddress: 'b', zoneId: 42 });
        stub.onCall(3).returns({ ethAddress: 'c', zoneId: 43 });

        const zone = 42;
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

        const zone = 42;
        const allTellers = await dether.getTellersInZone(zone);
        expect(allTellers.length).to.eq(2);
        expect(allTellers[0].ethAddress).to.eq('a');
        expect(allTellers[1].ethAddress).to.eq('b');

        stub.restore();
      });
    });
  });
});
