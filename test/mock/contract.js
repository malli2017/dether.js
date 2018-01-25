import Ethers from 'ethers';

const instance = {
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
  registerTeller: async () => ({
    hash: 'hash',
  }),
  getTellerStatus: async () => ({
    balance: Ethers.utils.parseEther('2.1'),
    status: true,

  }),
};

export default instance;
