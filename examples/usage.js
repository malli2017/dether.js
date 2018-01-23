// import DetherJS from 'detherjs';


const DetherJS = require('../src/index');


(async () => {
  console.log('DetherJS example');

  const dether = new DetherJS({
    network: 'kovan',
  });

  // User data
  console.log('=======================================');
  const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
// address: 0x14791697260E4c9A71f18484C9f997B308e59325
  const userPassword = '1234';

  const wallet = new DetherJS.Ethers.Wallet(privateKey);
  const encryptedWallet = await wallet.encrypt(userPassword);
  const user = await dether.getUser(encryptedWallet);
  // User registers as a teller

  const sellPoint = {
    lat: 1.12,
    lng: 2.21,
    countryId: 'FR',
    postalCode: 75019,
    rates: 20.20,
    avatarId: 1,
    currencyId: 2,
    messengerAddr: 'telegram',
    messengerAddr2: 'toshi',
    amount: 0.2,
  };

  const teller = await user.addSellPoint(sellPoint, userPassword);
  //console.log('Teller: ', teller);

  // Get teller info
  // let tellerInfo = await user.getInfo();
  // console.log('Teller info1: ', tellerInfo);

  tellerInfo  = await dether.getTeller('0x14791697260e4c9a71f18484c9f997b308e59325');
  console.log('Teller info2: ', tellerInfo);

  // validate user
  // const tsx = await user.certifyNewUser({user: '0x35ee4ec2BfabCB87da01b799c35dC1CcCCfCdc15'}, userPassword);
  // console.log('tsx => ', tsx);

  // Get list of teller in a zone
  const countryId = 'FR';
  const postalCode = 75019;
  const tellersInZone = await dether.getTellersInZone(countryId, postalCode);
  console.log(` ${tellersInZone.length} tellers found`);


  // // Get details of a teller
  // const tellerAddress = '0x085b30734fD4f48369D53225b410d7D04b2d9011';
  //
  // const publicTellerInfo = await dether.getTeller(tellerAddress);
  // // console.log(' Public teller: ', publicTellerInfo);
  //
  // // Get escrow balance of teller
  // const tellerBalance = await dether.getTellerBalance(tellerAddress);
  // // console.log(' Teller escrow balance: ', tellerBalance);




  // // Get teller balance
  // const userBalance = await user.getBalance();
  // console.log('Teller balance: ', userBalance);
  //
  // // User send coin from escrow account
  // const opts = {
  //   amount: 0.005,
  //   receiver: '0x609A999030cEf75FA04274e5Ac5b8401210910Fe',
  // };
  // const sendCoinTransaction = await user.sendToBuyer(opts, userPassword);
  // console.log('Send coin transaction: ', sendCoinTransaction);
  //
  // const withdrawTransaction = await user.deleteSellPoint(userPassword);
  // console.log('Withdraw transaction: ', withdrawTransaction);
  //
  // const finalUserBalance = await user.getBalance();
  // console.log('Teller balance: ', finalUserBalance);







  // // //////////////////////////////
  // // Public data
  //
  // // validate user
  //
  //
  // // Get list of all tellers
  // const allTellers = await dether.getAllTellers();
  // // console.log(` ${allTellers.length} tellers found`);
  // // console.log('All tellers: ', allTellers);
  //







})().catch(console.error);
