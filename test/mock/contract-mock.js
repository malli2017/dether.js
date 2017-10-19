import BigNumber from 'bignumber.js';

const instance = {
  getTellerPos: () =>
      new Promise(resolve => {
        resolve([1230000, 1110000, 42, 10000]);
      }),
  getTellerProfile: () =>
      new Promise(resolve => {
        resolve([2300, 10000, 200000, 'name', 3, 3, 'telegram']);
      }),
  sendCoin: () =>
      new Promise(resolve => {
        resolve({
          logs: [{
          event: 'SendCoin',
          args: {
            _from: '0x000000000000', _to: '0x100000000000', amount: 10000000, lat: 123000, lng: 321000,
          },
        }],
      });
    }),
  withdrawAll: () =>
      new Promise(resolve => {
        resolve({
          logs: [{
            event: 'Withdraw',
            args: {
              amount: 12300000, lat: 123000, lng: 321000,
            },
          }],
        });
      }),
  getTellerBalances: {
    call: () =>
      new Promise(resolve => {
          resolve(new BigNumber(1000000000000000000000));
      }),
  },
  registerPoint: () =>
    new Promise(resolve => {
      resolve({
        logs: [{
          event: 'RegisterPoint',
          args: {
            lat: 1222000, lng: 1239900, rates: 2300, address: '0x000000000000',
        },
      }],
    });
  }),
};

export const mock = {
  setProvider: () => {},
  at: () => instance,
  deployed: () => instance,
};


const storageInstance = {
  getAllTellers: () =>
    new Promise(res => {
      res([
        '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
        '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
        '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
        '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
        '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
        '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
        '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
      ]);
    }),
  getZone: {
    call: () =>
      new Promise(res => {
        res([
          '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
          '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
          '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
          '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
          '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
          '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
          '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
        ]);
      }),
  },
};

export const mockStorage = {
  setProvider: () => {},
  at: () => storageInstance,
  deployed: () => storageInstance,
};
