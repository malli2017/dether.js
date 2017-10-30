// import DetherJS from 'detherjs';
const DetherJS = require('../src/index');

(async () => {
  console.log('DetherJS example');

  const dether = new DetherJS({
    network: 'kovan',
  });

  await dether.init();

  // //////////////////////////////
  // Public data

  // Get list of all tellers
  const allTellers = await dether.getAllTellers();
  console.log('All tellers: ', allTellers.length);

  return;

  // Get list of teller in a zone
  const zone = 42;
  const tellersInZone = await dether.getTellersInZone(zone);
  console.log('Tellers in zone: ', tellersInZone);

  // Get details of a teller
  const tellerAddress = 'fizejfeoizj';
  const publicTellerInfo = await dether.getTeller(tellerAddress);
  console.log('Public teller: ', publicTellerInfo);


  // //////////////////////////////
  // User data

  const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
  const userPassword = 'Dether@1';

  const wallet = DetherJS.Wallet.fromPrivateKey(privateKey, userPassword);
  const user = await dether.getUser(wallet);

  // User registers as a teller
  const point = {
    lat: 1, lng: 2,
  };
  const teller = await user.registerPoint(point, userPassword);
  console.log('Teller: ', teller);

  // Get teller info
  const tellerInfo = await user.getInfo();
  console.log('Teller info: ', tellerInfo);

  // User remove points and withdraw
  await user.deleteSellPoint(userPassword);

  // User send coin from escrow account
  const buyerAddress = 'zioajfeozifjez';
  const transaction = await user.sendCoin(buyerAddress, userPassword);
  console.log('Send coin transaction: ', transaction);

  // Get teller balance
  const tellerBalance = await user.getBalance();
  console.log('Teller balance: ', tellerBalance);

})().catch(console.error);