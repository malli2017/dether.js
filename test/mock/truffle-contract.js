import BigNumber from 'bignumber.js';


const instance = {
  getTellerPos: jest.fn(
    (/* address */)  =>
      new Promise(resolve => {
        resolve({1230000, 1110000, 42, new BigNumber(10000000000000000000)});
      }),
  ),
  getTellerProfile: jest.fn(
    (/* address */)  =>
      new Promise(resolve => {
        resolve({ 2300, new BigNumber(10000000000000000000), 200000, 'name', 3, 3, 'telegram'});
      }),
  ),
  sendCoin: jest.fn(
    (/* address, amount */) =>
      new Promise(resolve => {
        resolve({ logs: [{ event: "SendCoin", args: { _from: '0x000000000000', _to: '0x100000000000', new BigNumber(10000000000000000000), 123000, 321000 } }] });
      }),
  ),
  withdrawAll: jest.fn(
    () =>
      new Promise(resolve => {
        resolve({ logs: [{ event: "Withdraw", args: { 12300000, 123000, 321000 } }] });
      }),
  ),
  getTellerBalances: jest.fn(
    (/* address */) =>
    new promise( resolve => {
        resolve(new BigNumber(10000000000000000000));
    }),
  ),
  registerPoint: jest.fn(
    (/* lat, lng, zone, rate, avatar, currency, telegram address, name */) =>
    new Promise(resolve => {
      resolve({ logs: [{ event: "RegisterPoint", args: { 1222000, 1239900, 2300, '0x000000000000' } }] })
    })
  ),
};

instance.createVault.estimateGas = jest.fn(() => 650000);

const contract = {
  setProvider: jest.fn(),
  at: jest.fn(() => instance),
  deployed: jest.fn(() => instance),
};

const constructor = jest.fn(() => contract);
constructor.mockInspect = { instance, contract };

export default constructor;
