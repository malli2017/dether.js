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
    hash: 'hash',
  }),
  withdrawAll: async () => ({
    hash: 'hash',
  }),
  getTellerBalances: async () => ({ 0: new BigNumber(1000000000000000000000) }),
  registerPoint: async () => ({
    hash: 'hash',
  }),
};

export default instance;