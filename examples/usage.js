// import DetherJS from 'detherjs';
const DetherJS = require('../src/index');

(async () => {
  console.log('DetherJS example');
  let dether;

  try {
    dether = new DetherJS({
      network: 'kovan',
    });
    console.log('- Detherjs has been instantiated');
  } catch (e) {
    throw new Error(e);
  }


  // //////////////////////////////
  // Public data

  // Get list of all tellers
  const allTellers = await dether.getAllTellers();
  console.log(` ${allTellers.length} tellers found`);
  // console.log('All tellers: ', allTellers);


  // Get list of all tellers
  const addr = [
    '0x21C3aC79007A530BF061adF8dfb739eae78636E1',
    '0x5B585B7BBd948696bb1c4c11D10d4103B4895EFd',
    '0x35ee4ec2BfabCB87da01b799c35dC1CcCCfCdc15',
    '0x788f7291E1BA5b299CabBe5b70F8b4869f4222A2',
  ];

  const tellers = await dether.getAllTellers(addr);
  console.log(` ${tellers.length} tellers found`);

  // Get list of teller in a zone
  const zone = 42;
  const tellersInZone = await dether.getTellersInZone(zone);
  console.log(` ${tellersInZone.length} tellers found`);


  // Get list of teller from multiple zone

  const zones = [42, 101, 3104];
  const tellersInZones = await dether.getTellersInZone(zones);
  console.log(` ${tellersInZones.length} tellers found`);


  // Get details of a teller
  const tellerAddress = '0x085b30734fD4f48369D53225b410d7D04b2d9011';

  const publicTellerInfo = await dether.getTeller(tellerAddress);
  console.log(' Public teller: ', publicTellerInfo);

  // Get escrow balance of teller
  const tellerBalance = await dether.getTellerBalance(tellerAddress);
  console.log(' Teller escrow balance: ', tellerBalance);

  // User data
  console.log('=======================================');
  const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
  const userPassword = 'Dether@1';

  const wallet = new DetherJS.Wallet(privateKey);
  const encryptedWallet = await wallet.encrypt(userPassword);
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

  const teller = await user.addSellPoint(sellPoint, userPassword);
  console.log('Teller: ', teller);

  // Get teller info
  const tellerInfo = await user.getInfo();
  console.log('Teller info: ', tellerInfo);

  // Get teller balance
  const userBalance = await user.getBalance();
  console.log('Teller balance: ', userBalance);

  // User send coin from escrow account
  const opts = {
    amount: 0.005,
    receiver: '0x609A999030cEf75FA04274e5Ac5b8401210910Fe',
  };
  const sendCoinTransaction = await user.sendCoin(opts, userPassword);
  console.log('Send coin transaction: ', sendCoinTransaction);

  const withdrawTransaction = await user.withdrawAll(userPassword);
  console.log('Withdraw transaction: ', withdrawTransaction);

  const finalUserBalance = await user.getBalance();
  console.log('Teller balance: ', finalUserBalance);
})().catch(console.error);
