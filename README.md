# DetherJS
[![NPM](https://nodei.co/npm/detherjs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/detherjs/)

[![Build Status](https://travis-ci.com/dethertech/dether.js.svg?token=kdsX9Y3G2xZ5ptCyzuYL&branch=master)](https://travis-ci.com/dethertech/dether.js)
[![npm version](https://badge.fury.io/js/detherjs.svg)](https://badge.fury.io/js/detherjs)
[![GitHub issues](https://img.shields.io/github/issues/dethertech/dether.js.svg)](https://github.com/dethertech/dether.js/issues)
[![GitHub stars](https://img.shields.io/github/stars/dethertech/dether.js.svg)](https://github.com/dethertech/dether.js/stargazers)
[![Package Quality](http://npm.packagequality.com/shield/detherjs.svg)](http://packagequality.com/#?package=detherjs)

DetherJS is Javascript SDK to easily interact with [DetherContracts](https://github.com/dethertech/detherContracts)

It provides wrappers for all the public methods of the contract and formats values in and out.

## Table of Contents

* [Install](#install)
* [Docs](#doc)
* [Usage](#usage)
* [Dev](#dev)
* [Test](#test)
* [Example](#example)
* [Build doc](#build-doc)
* [Dependencies](#dependencies)
* [Bugs](#bugs)
* [Donation](#donation)

## Install

Use NPM to get the package

```
npm install --save detherjs

yarn add detherjs
```

## Docs

Extensive documentation of all the methods can be found on the [API documentation](https://dethertech.github.io/dether.js)

## Usage

You can find more examples of method usage in [examples/usage.js](https://github.com/dethertech/dether.js/blob/master/examples/usage.js)

### Instanciate a new DetherJS instance
```javascript
import DetherJS from 'dether.js';

const detherjs = new DetherJS({
  network: 'ropsten',
  rpcURL: 'http://localhost:8545',
  etherscanKey: 'etherscan',
});
```
#### Inputs

* `network`: Network
* `rpcURL`: Provider URL
* `etherscanKey`: Etherscan key

#### Return value
New instance of DetherJS

### Get Teller
```javascript
const addr = '0xab5801a7d398351b8be11c439e05c5b3259aec9b';

try {
  cont teller = await detherjs.getTeller(addr)
} catch () {
  console.log(e);
}
```

#### Inputs
* `addr`: Ethereum address

#### Return value
```javascript
{
  lat: 1, // Latitude
  lng: 2, // Longitude
  zoneId: 42, // Country ID
  escrowBalance: 0.01, // Escrow balance
  rates: 20, // Fees
  volumeTrade: 0, // Volume of Trade
  nbTrade: 0, // Number of trade
  name: 'bob', // Username
  currencyId: 1, // Currency id (1 === 'USD')
  avatarId: 1, // Avatar ID
  messengerAddr: 'bobychou', // Telegram username
  ethAddress: '0x085b30734fD4f48369D53225b410d7D04b2d9011', // Ethereum address
}
```

### Get all tellers
```javascript
try {
  const allTellers = await detherjs.getAllTellers();
  console.log(allTellers);
} catch(e) {
  console.log(e);
}
```

#### Inputs
`getAllTellers` can receive an array of addresses
* `addrs`: Array of ethereum addresses

#### Return value
Array of tellers


### Get Tellers In Zone
```Javascript
try {
  const tellersInZone = await detherjs.getTellersInZone();
} catch (e) {
  console.log(e);
}
```

#### Inputs
`getTellersInZone` can receive an array of zones ID
* `zones`: Array of zones ID

#### Return value
Array of tellers


### Get Teller Balance
```javascript
const addr = '0xab5801a7d398351b8be11c439e05c5b3259aec9b';

try {
  const balance = await detherjs.getTellerBalance(addr);
} catch (e) {
  console.log(e);
}
```

#### Inputs
* `addr`: Ethereum address

#### Return value
Receive escrow balance of teller


### Instanciate User methods
```Javascript
const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
const userPassword = '1234';

const wallet = new DetherJS.Ethers.Wallet(privateKey);
const encryptedWallet = await wallet.encrypt(userPassword);

const User = await dether.getUser(encryptedWallet);
```

### Add Sell Point
```javascript
const password = '123456789';

const data = {
  lat: 1.12,
  lng: 2.21,
  zone: 42,
  rates: 20.20,
  avatar: 1,
  currency: 2,
  telegram: 'boby',
  username: 'Boby',
  amount: 0.01,
}

try {
  const hash = await User.addSellPoint(data, password);
} catch (e) {
  console.log(e);
}
```

#### Inputs
* `lat`: Latitude
* `lng`: Longitude
* `zone`: Country ID
* `rates`: Teller Fees
* `avatar`: Avatar ID
* `currency`: Currency id (1 === 'USD')
* `telegram`: Telegram username
* `username`: Username
* `amount`: Escrow balance
* `password`: Password to decrypt the wallet

#### Return value
Return receipt of transaction

### Get Info
```javascript
try {
  const info = User.getInfo();
} catch (e) {
  console.log(e);
}
```

#### Return value
Return teller info if you are teller

### Get Balance
```Javascript
try {
  const info = User.getBalance();
} catch (e) {
  console.log(e);
}
```
#### Return value
Return your balance if you are teller

### Send To Buyer
```Javascript
const password = '123456789';

const opts = {
  amount: 0.005,
  receiver: '0x609A999030cEf75FA04274e5Ac5b8401210910Fe',
};

try {
  const sendCoinTransaction = await User.sendToBuyer(opts, password);
} catch (e) {
  console.log(e);
}
```

#### Inputs
* `password`: Password to decrypt the wallet
* `amount`: Amount to send
* `receiver`: Receiver's ethereum address

#### Return value
Return receipt of transaction


### Delete Sell Point
```javascript
const password = '123456789';

try {
  const hash = await User.deleteSellPoint(password);
} catch (e) {
  console.log(e)
}
```

#### Inputs
* `password`: Password to decrypt the wallet

#### Return value
Return receipt of transaction

## Dev
```
git clone https://github.com/dethertech/dether.js.git
cd dether.js
yarn
```

## Test
```
yarn test
```

## Example
```
yarn run example
```

## Build doc
```
yarn run esdoc
yarn run publish:esdoc
```

## Dependencies

* [dethercontract](https://github.com/dethertech/dethercontracts.git)
* [ethers.js](https://github.com/ethers-io/ethers.js)
* [babel-polyfill](https://github.com/babel/babel/tree/master/packages/babel-polyfill)
* [utf8](https://github.com/mathiasbynens/utf8.js)

## Bugs

When you find issues, please report them:

* web: [https://github.com/dethertech/dether.js/issues](https://github.com/dethertech/dether.js/issues)


## Donation
* [Ethereum Foundation](https://ethereum.org/donate)
* [Etherscan](https://etherscan.io/address/0x71c7656ec7ab88b098defb751b7401b5f6d8976f)
* [MyEtherWallet](https://etherscan.io/address/0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8)

## TODO
* Add more tests
