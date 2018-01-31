/* eslint-disable */
// import DetherJS from 'detherjs';
import DetherInterfaceJson from 'dethercontract/contracts/DetherInterface.json';
import DetherTellerStorageJson from 'dethercontract/contracts/DetherTellerStorage.json';
import DetherSmsJson from 'dethercontract/contracts/SmsCertifier.json';


const DetherJS = require('../src/index');


(async () => {
  console.log('DetherJS example');

  const dether = new DetherJS({
    network: 'kovan',
  });

// instanciate masterUser
const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890321';
// address: 0x391edA1b8D31f891d1653B131779751BdeDA24D3
const userPassword = '1234';
const wallet = new DetherJS.Ethers.Wallet(privateKey);
const encryptedWallet = await wallet.encrypt(userPassword);
const user = await dether.getUser(encryptedWallet);
wallet.provider = dether.provider;


// create 3 random priv key with address
// const wallet1 = new DetherJS.Ethers.Wallet.createRandom();
// const encryptedWallet1 = await wallet.encrypt(userPassword);
// const user1 = await dether.getUser(encryptedWallet);
// wallet1.provider = dether.provider;
//
// const wallet2 = new DetherJS.Ethers.Wallet.createRandom();
// const encryptedWallet2 = await wallet.encrypt(userPassword);
// const user2 = await dether.getUser(encryptedWallet);
// wallet2.provider = dether.provider;
//
// const wallet3 = new DetherJS.Ethers.Wallet.createRandom();
// const encryptedWallet3 = await wallet.encrypt(userPassword);
// const user3 = await dether.getUser(encryptedWallet);
// wallet3.provider = dether.provider;
//
// // credit them from master key
// console.log('wallet master -> ', wallet.address);
// console.log('wallet 1 -> ', wallet1.address);
// console.log('wallet 2 -> ', wallet2.address);
// console.log('wallet 3 -> ', wallet3.address);
// console.log('wallet pre funding');
// console.log('master', DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet.address)));
// console.log('1', DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet1.address)));
// console.log('2', DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet2.address)));
// console.log('3', DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet3.address)));
// let tsx = await wallet.sendTransaction({to: wallet1.address, value: DetherJS.Ethers.utils.parseEther("0.1")});
// await dether.provider.waitForTransaction(tsx.hash);
// tsx = await wallet.sendTransaction({to: wallet2.address, value: DetherJS.Ethers.utils.parseEther("0.1")});
// await dether.provider.waitForTransaction(tsx.hash);
// tsx = await wallet.sendTransaction({to: wallet3.address, value: DetherJS.Ethers.utils.parseEther("0.1")});
// await dether.provider.waitForTransaction(tsx.hash);
// console.log('-- wallet post funding --');
// console.log('master', DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet.address)));
// console.log('1', DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet1.address)));
// console.log('2', DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet2.address)));
// console.log('3', DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet3.address)));

// deploy new contract
const deployStorageTransaction = DetherJS.Ethers.Contract.getDeployTransaction(DetherTellerStorageJson.bytecode, DetherTellerStorageJson.abi);
const deploySmsTransaction = DetherJS.Ethers.Contract.getDeployTransaction(DetherSmsJson.bytecode, DetherSmsJson.abi);

let deployContract = await wallet.sendTransaction(deployStorageTransaction, {gasLimit: 3000000, gasPrice: DetherJS.Ethers.utils.bigNumberify("40000000000")});
let deployedContract = await dether.provider.waitForTransaction(deployContract.hash);

function getAddress() {
    return new Promise(function(resolve, reject) {
        // Some asynchronous method; some examples
        //  - request which account from the user
        //  - query a database
        //  - wait for another contract to be mined

        var address = wallet.address;

        resolve(address);
    });
}

function sign(transaction) {
    return new Promise(function(resolve, reject) {
        // Some asynchronous method; some examples
        //  - prompt the user to confirm or decline
        //  - check available funds and credits
        //  - request 2FA over SMS

        var signedTransaction = wallet.sign(transaction);

        resolve(signedTransaction);
    });
}

var customSigner = {
    getAddress: getAddress,
    provider: ethers.providers.getDefaultProvider(),
    sign: sign,
    sendTransaction: 
}



console.log('contract deployed => ', deployedContract);
console.log('contract => ', deployContract);

/*
 * START TEST
 */

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

  // const teller = await user.addSellPoint(sellPoint, userPassword);

  // Get teller info
  // let tellerInfo = await user.getInfo();
  // console.log('Teller info1: ', tellerInfo);

  // let tellerInfo  = await dether.getTeller('0x391edA1b8D31f891d1653B131779751BdeDA24D3');
  // console.log('Teller info2: ', tellerInfo);

  // validate user
  // const tsx = await user.certifyNewUser({user: '0x35ee4ec2BfabCB87da01b799c35dC1CcCCfCdc15'}, userPassword);
  // console.log('tsx => ', tsx);

  // Get list of teller in a zone
  // const countryId = 'FR';
  // const postalCode = 75019;
  // const tellersInZone = await dether.getTellersInZone(countryId, postalCode);
  // console.log('tellerinzone', tellersInZone);


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

  // refund master
  // let balance1 = DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet1.address)) - 0.03;
  // let balance2 = DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet2.address)) - 0.03;
  // let balance3 = DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet3.address)) - 0.03;
  // tsx = await wallet1.sendTransaction({to: wallet.address, value: DetherJS.Ethers.utils.parseEther('' + balance1)});
  // await dether.provider.waitForTransaction(tsx.hash);
  // tsx = await wallet2.sendTransaction({to: wallet.address, value: DetherJS.Ethers.utils.parseEther('' + balance2)});
  // await dether.provider.waitForTransaction(tsx.hash);
  // tsx = await wallet3.sendTransaction({to: wallet.address, value: DetherJS.Ethers.utils.parseEther('' + balance3)});
  // await dether.provider.waitForTransaction(tsx.hash);
  // console.log('-- wallet post refund to master --');
  // console.log('master', DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet.address)));
  // console.log('1', DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet1.address)));
  // console.log('2', DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet2.address)));
  // console.log('3', DetherJS.Ethers.utils.formatEther(await dether.provider.getBalance(wallet3.address)));





})().catch(console.error);
