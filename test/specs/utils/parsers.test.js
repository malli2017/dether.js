/* global describe it */
import { expect } from 'chai';
import BigNumber from 'bignumber.js';
import Parsers from '../../../src/utils/parsers';


describe('parsers', () => {
  it('tellerPosFromContract', () => {
    const rawTellerPos = [
      new BigNumber(123),
      new BigNumber(456),
      new BigNumber(789),
      new BigNumber(5000000000),
    ];
    const tellerPos = Parsers.tellerPosFromContract(rawTellerPos);

    expect(tellerPos.lat).to.eq(0.00123);
    expect(tellerPos.lng).to.eq(0.00456);
    expect(tellerPos.zoneId).to.eq(789);
    expect(tellerPos.escrowBalance).to.eq(5e-9);
  });

  it('tellerProfileFromContract', () => {
    const rawTellerProfile = [
      new BigNumber(2),
      new BigNumber(6000000000),
      new BigNumber(4),
      '0x4861717279000000000000000000000000000000000000000000000000000000',
      new BigNumber(5),
      new BigNumber(6),
      '0x4861727179000000000000000000000000000000000000000000000000000000',
    ];
    const tellerProfile = Parsers.tellerProfileFromContract(rawTellerProfile);

    expect(tellerProfile.name).to.eq('Haqry');
    expect(tellerProfile.messengerAddr).to.eq('Harqy');
    expect(tellerProfile.rates).to.eq(2);
    expect(tellerProfile.volumeTrade).to.eq(6e-9);
    expect(tellerProfile.nbTrade).to.eq(4);
    expect(tellerProfile.currencyId).to.eq(5);
    expect(tellerProfile.avatarId).to.eq(6);
  });
});