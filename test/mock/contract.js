import Ethers from 'ethers';

const instance = {
  getTellerPos: async () =>
    [
      912312,
      812312,
      789,
      Ethers.utils.bigNumberify('2200000000000000000'),
    ],
  getTellerProfile: async () =>
    ({
      rates: 2313,
      volumeTrade: Ethers.utils.parseEther('1.2'),
      nbTrade: Ethers.utils.bigNumberify(12),
      name: '0x4861717279000000000000000000000000000000000000000000000000000000',
      currency: 1,
      avatar: 2,
      telAddr: '0x4861727179000000000000000000000000000000000000000000000000000000',
    }),
  sendCoin: async () => ({
    hash: 'hash',
  }),
  withdrawAll: async () => ({
    hash: 'hash',
  }),
  getTellerBalances: async () => ({ 0: Ethers.utils.bigNumberify('2200000000000000000') }),
  registerPoint: async () => ({
    hash: 'hash',
  }),
};

export default instance;