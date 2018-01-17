import Ethers from 'ethers';

const instance = {
  getTellerPos: async () =>
    [
      912312,
      812312,
      '0x4652000000000000000000000000000000000000000000000000000000000000',
      75009,
    ],
  getTellerProfile: async () =>
    ({
      avatarId: 2,
      currencyId: 1,
      messengerAddr: '0x4861727179000000000000000000000000000000000000000000000000000000',
      messengerAddr2: '0x4861727179000000000000000000000000000000000000000000000000000000',
      rate: 2313,
      volumeSell: Ethers.utils.parseEther('1.2'),
      volumeBuy: Ethers.utils.parseEther('2.2'),
      nbTrade: Ethers.utils.bigNumberify(12),
      balance: Ethers.utils.parseEther('2.1'),
    }),
  sendCoin: async () => ({
    hash: 'hash',
  }),
  // withdrawAll: async () => ({
  //   hash: 'hash',
  // }),
  updateProfile: async () => ({
    hash: 'hash',
  }),
  updatePosition: async () => ({
    hash: 'hash',
  }),
  addBalance: async () => ({
    hash: 'hash',
  }),
  switchTellerOffline: async () => ({
    hash: 'hash',
  }),
  deleteMyProfile: async () => ({
    hash: 'hash',
  }),
  getTellerBalance: async () => ({ 0: Ethers.utils.bigNumberify('2200000000000000000') }),
  registerPoint: async () => ({
    hash: 'hash',
  }),
  getTellerStatus: async () => ({
    balance: Ethers.utils.parseEther('2.1'),
    status: true,

  }),
};

export default instance;
