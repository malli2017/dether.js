import Ethers from 'ethers';

const storageInstance = {
  getTellerPositionRaw: async () =>
    [
      912312,
      812312,
      // '0x4652000000000000000000000000000000000000000000000000000000000000',
      'FR',
      75009,
    ],
  getTellerProfile1: async () =>
    ({
      avatarId: 2,
      currencyId: 1,
      messengerAddr: 'telegram',
      messengerAddr2: 'toshi',
    }),
    getTellerProfile2: async () =>
      ({
        rate: 2313,
        volumeSell: Ethers.utils.parseEther('1.2'),
        volumeBuy: Ethers.utils.parseEther('2.2'),
        nbTrade: Ethers.utils.bigNumberify(12),
        balance: Ethers.utils.parseEther('2.1'),
      }),
  getAllTellers: async () => [
    [
      '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb621',
      '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb622',
      '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
    ],
  ],
  getZone: async (data) => {
    const _42 = [
      '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb621',
      '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb622',
      '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
    ];
    const _101 = [
      '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb621',
      '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb622',
      '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
    ];
    return data === 42 ? _42 : _101;
  },
};

export default storageInstance;
