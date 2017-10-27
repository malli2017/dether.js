import BigNumber from 'bignumber.js';

const instance = {
  getTellerPos: async () =>
    [
      new BigNumber(123),
      new BigNumber(345),
      new BigNumber(678),
      new BigNumber(1),
    ],
  getTellerProfile: async () =>
    [
      new BigNumber(123444),
      new BigNumber(123444),
      new BigNumber(123444),
      '0x4861727279000000000000000000000000000000000000000000000000000000',
      new BigNumber(123444),
      new BigNumber(123444),
      '0x4861727279000000000000000000000000000000000000000000000000000000',
    ],
  sendCoin: async () => ({
    logs: [{
      event: 'SendCoin',
      args: {
        _from: '0x000000000000', _to: '0x100000000000', amount: 10000000, lat: 123000, lng: 321000,
      },
    }],
  }),
  withdrawAll: async () => ({
    logs: [{
      event: 'Withdraw',
      args: {
        amount: 12300000, lat: 123000, lng: 321000,
      },
    }],
  }),
  getTellerBalances: {
    call: async () => new BigNumber(1000000000000000000000),
  },
  registerPoint: async () => '0x000000000000000000000000000',
};

export default instance;