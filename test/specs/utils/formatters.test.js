/* global describe it */
import { expect } from 'chai';
import Ethers from 'ethers';
import Formatters from '../../../src/utils/formatters';


describe('formatters', () => {
  describe('tellerPosFromContract', () => {
    it('example 1', () => {
      const rawTellerPos = [
        123,
        456,
        789,
        Ethers.utils.bigNumberify('1200000000000000000'),
      ];
      console.log(rawTellerPos);
      const tellerPos = Formatters.tellerPosFromContract(rawTellerPos);

      expect(tellerPos.lat).to.eq(0.00123);
      expect(tellerPos.lng).to.eq(0.00456);
      expect(tellerPos.zoneId).to.eq(789);
      expect(tellerPos.escrowBalance).to.eq('1.2');
    });
    it('example 2', () => {
      const rawTellerPos = [
        912312,
        812312,
        1,
        Ethers.utils.bigNumberify('2200000000000000000'),
      ];
      const tellerPos = Formatters.tellerPosFromContract(rawTellerPos);

      expect(tellerPos.lat).to.eq(9.12312);
      expect(tellerPos.lng).to.eq(8.12312);
      expect(tellerPos.zoneId).to.eq(1);
      expect(tellerPos.escrowBalance).to.eq('2.2');
    });
    it('example 2', () => {
      const rawTellerPos = [
        1912312,
        1812312,
        1,
        Ethers.utils.bigNumberify('2200000000000000000'),
      ];
      const tellerPos = Formatters.tellerPosFromContract(rawTellerPos);

      expect(tellerPos.lat).to.eq(19.12312);
      expect(tellerPos.lng).to.eq(18.12312);
      expect(tellerPos.zoneId).to.eq(1);
      expect(tellerPos.escrowBalance).to.eq('2.2');
    });
    it('example 2', () => {
      const rawTellerPos = [
        -1912312,
        -1812312,
        1,
        Ethers.utils.bigNumberify('2200000000000000000'),
      ];
      const tellerPos = Formatters.tellerPosFromContract(rawTellerPos);

      expect(tellerPos.lat).to.eq(-19.12312);
      expect(tellerPos.lng).to.eq(-18.12312);
      expect(tellerPos.zoneId).to.eq(1);
      expect(tellerPos.escrowBalance).to.eq('2.2');
    });
  });

  describe('tellerProfileFromContract', () => {
    it('example 1', () => {
      const rawTellerProfile = {
        rates: 2313,
        volumeTrade: Ethers.utils.parseEther('1.2'),
        nbTrade: Ethers.utils.bigNumberify(12),
        name: '0x4861717279000000000000000000000000000000000000000000000000000000',
        currency: 1,
        avatar: 2,
        telAddr: '0x4861727179000000000000000000000000000000000000000000000000000000',
      };

      const tellerProfile = Formatters.tellerProfileFromContract(rawTellerProfile);

      expect(tellerProfile.name).to.eq('Haqry');
      expect(tellerProfile.messengerAddr).to.eq('Harqy');
      expect(tellerProfile.rates).to.eq(23.13);
      expect(tellerProfile.volumeTrade).to.eq('1.2');
      expect(tellerProfile.nbTrade).to.eq(12);
      expect(tellerProfile.currencyId).to.eq(1);
      expect(tellerProfile.avatarId).to.eq(2);
    });
  });

  describe('sellPointToContract', () => {
    it('example 1', () => {
      const rawSellPoint = {
        lat: 1.233,
        lng: 2.233,
        zone: 42,
        rates: 23.13,
        avatar: 2,
        currency: 1,
        telegram: 'ab',
        username: 'ba',
      };
      const sellPoint = Formatters.sellPointToContract(rawSellPoint);

      expect(sellPoint.lat).to.eq(123300);
      expect(sellPoint.lng).to.eq(223300);
      expect(sellPoint.zone).to.eq(42);
      expect(sellPoint.rates).to.eq(2313);
      expect(sellPoint.avatar).to.eq(2);
      expect(sellPoint.currency).to.eq(1);
      expect(sellPoint.telegram.constructor.name).to.eq('Uint8Array');
      expect(sellPoint.telegram[0]).to.eq(97);
      expect(sellPoint.telegram[1]).to.eq(98);
      expect(sellPoint.username.constructor.name).to.eq('Uint8Array');
      expect(sellPoint.username[0]).to.eq(98);
      expect(sellPoint.username[1]).to.eq(97);
    });
    it('example 2', () => {
      const rawSellPoint = {
        lat: 1.23384739847,
        lng: 2.2338742383,
        zone: 42,
        rates: 23.13321,
        avatar: 2,
        currency: 1,
        telegram: 'ab',
        username: 'ba',
      };
      const sellPoint = Formatters.sellPointToContract(rawSellPoint);

      expect(sellPoint.lat).to.eq(123384);
      expect(sellPoint.lng).to.eq(223387);
      expect(sellPoint.rates).to.eq(2313);
    });
    it('example 3', () => {
      const rawSellPoint = {
        lat: 12,
        lng: 23,
        zone: 42,
        rates: 23,
        avatar: 2,
        currency: 1,
        telegram: 'ab',
        username: 'ba',
      };
      const sellPoint = Formatters.sellPointToContract(rawSellPoint);

      expect(sellPoint.lat).to.eq(1200000);
      expect(sellPoint.lng).to.eq(2300000);
      expect(sellPoint.rates).to.eq(2300);
    });
    it('example 3', () => {
      const rawSellPoint = {
        lat: 12.1,
        lng: 23.1,
        zone: 42,
        rates: 23,
        avatar: 2,
        currency: 1,
        telegram: 'ab',
        username: 'ba',
      };
      const sellPoint = Formatters.sellPointToContract(rawSellPoint);

      expect(sellPoint.lat).to.eq(1210000);
      expect(sellPoint.lng).to.eq(2310000);
    });
    it('example 3', () => {
      const rawSellPoint = {
        lat: -12.1,
        lng: -23.1,
        zone: 42,
        rates: 23,
        avatar: 2,
        currency: 1,
        telegram: 'ab',
        username: 'ba',
      };
      const sellPoint = Formatters.sellPointToContract(rawSellPoint);

      expect(sellPoint.lat).to.eq(-1210000);
      expect(sellPoint.lng).to.eq(-2310000);
    });
    // TODO are lat lng possibly > 100 ?
  });
});