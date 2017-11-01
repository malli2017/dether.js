// import DetherJS from 'detherjs';
const DetherJS = require('../src/index');

(async () => {
  console.log('DetherJS example');

  const dether = new DetherJS({
    network: 'kovan',
  });

  // //////////////////////////////
  // Public data

  // Get list of all tellers
  const allTellers = await dether.getAllTellers();
  console.log('All tellers: ', allTellers.length);
  // console.log('All tellers: ', allTellers);

  // Get list of teller in a zone
  const zone = 42;
  const tellersInZone = await dether.getTellersInZone(zone);
  console.log('Tellers in zone: ', tellersInZone);

  // Get details of a teller
  const tellerAddress = '0x085b30734fD4f48369D53225b410d7D04b2d9011';
  const publicTellerInfo = await dether.getTeller(tellerAddress);
  console.log('Public teller: ', publicTellerInfo);

  // Get balance of teller
  const tellerBalance = await dether.getTellerBalance(tellerAddress);
  console.log('Teller balance: ', tellerBalance);


  // //////////////////////////////
  // User data

  const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
  const userPassword = 'Dether@1';

  const wallet = new DetherJS.Wallet(privateKey);
  const encryptedWallet = wallet.encrypt(userPassword);
  const user = await dether.getUser(encryptedWallet);

  // User registers as a teller

  const sellPoint = {
    lat: 1.12,
    lng: 2.21,
    zone: 42,
    rates: 20.20,
    avatar: 1,
    currency: 2,
    telegram: 'https://telegram.me/boby',
    username: 'Boby',
    amount: 0.01,
  };

  const teller = await user.registerPoint(sellPoint, userPassword);
  console.log('Teller: ', teller);

  // Get teller info
  const tellerInfo = await user.getInfo(userPassword);
  console.log('Teller info: ', tellerInfo);

  // Get teller balance
  const userBalance = await user.getBalance(userPassword);
  console.log('Teller balance: ', userBalance);

  // User remove points and withdraw
  const withdrawTransaction = await user.withdrawAll(userPassword);
  console.log('Withdraw transaction: ', withdrawTransaction);

  // User send coin from escrow account
  const buyerAddress = '0x0123456789012345678901234567890123456789012345678901234567890123';
  const sendCoinTransaction = await user.sendCoin(buyerAddress, userPassword);
  console.log('Send coin transaction: ', sendCoinTransaction);
})().catch(console.error);