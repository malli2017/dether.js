# detherGateway [![Build Status](https://travis-ci.com/dethertech/detherGateway.svg?token=kdsX9Y3G2xZ5ptCyzuYL&branch=master)](https://travis-ci.com/dethertech/detherGateway) ![npm](https://img.shields.io/npm/v/detherGateway.svg)
Dether Gateway

## Table of Contents

* [Get Started](#get-started)
* [Usages](#usages)
    * [Add tellers](#add-tellers)
    * [Get teller](#get-teller)
    * [Get zone](#get-zone)
    * [Get all](#get-all)
    * [Get balance](#get-balance)
    * [Delete teller](#delete-teller)
* [Install](#install)
* [Example](#example)
* [Dev](#dev)
* [Test](#test)
* [Build doc](#build-doc)
* [Dependencies](#dependencies)
* [Dev Dependencies](#dev-dependencies)
* [Bugs](#bugs)
* [License](#license)
* [Donation](#donation)

## Usages

### Add tellers
```javascript
const tellers = detherGateway.tellers.add(teller);
```

#### Inputs

* `teller`: Ethereum address
* `lat` latitude min -90 max +90
* `lng` longitude min -180 max +180
* `zone` geographic zone
* `rates` Margin (0-100 * 100)
* `avatar` (1-9)
* `currency` number (0-4)
* `telegam` pseudo telegram
* `amount` escrow
* `username` username
* `keystore` deserialize keystore
* `password` string
* `providerUrl`string

#### Return value
```javascript
{
    from: ethToolbox.utils.add0x(key.address),
    to: dtrContractInstance.address,
    value: teller.amount,
    date: new Date().toLocaleString('en-US', { hour12: false }),
    dether: {
      detherContract: true,
      receive: false,
    },
    etherscan: {
      kovan: `https://kovan.etherscan.io/tx/${result}`,
      ropsten: `https://ropsten.etherscan.io/tx/${result}`,
      ether: `https://etherscan.io/tx/${result}`,
    }
  }
```

### Get teller
```javascript
const tellers = detherGateway.tellers.get(address);
```

#### Inputs

* `address`: Ethereum address

#### Return value
```javascript
{
  name: UTILITYWEB3.toUtf8(tellerProfile[3]) || 'Dether',
  messengerAddr: UTILITYWEB3.toUtf8(tellerProfile[6]) || 'Dether_io',
  lat: tellerPos[0].toNumber() / (10 ** 5) || 48.864716,
  lng: tellerPos[1].toNumber() / (10 ** 5) || 2.349014,
  zoneId: tellerPos[2].toNumber(),
  escrowBalance: Number(UTILITYWEB3.fromWei(tellerPos[3].toNumber(), 'ether')) || 0,
  rates: tellerProfile[0].toNumber(),
  volumeTrade: Number(UTILITYWEB3.fromWei(tellerProfile[1].toNumber(), 'ether')) || 0,
  nbTrade: tellerProfile[2].toNumber(),
  currencyId: tellerProfile[4].toNumber(),
  avatarId: tellerProfile[5].toNumber(),
  ethAddress: address,
  id: address,
}
```

### Get zone
```javascript
const tellers = detherGateway.tellers.getZone(countryCode);
```

#### Inputs

* `countryCode`: Geocoding country CODE (only the digit)

#### Return value
* {array} array of tellers


### Get all
```javascript
const tellers = detherGateway.tellers.getAll();
```

#### Inputs

* .

#### Return value
* {array} array of all tellers


### Get balance
```javascript
const tellers = detherGateway.tellers.balance(address);
```

#### Inputs

* `address`: Tellers Ethereum address

#### Return value
* balance of tellers


### Delete teller
```javascript
const tellers = detherGateway.tellers.del(address);
```

#### Inputs

* `address`: Tellers Ethereum address

#### Return value
* balance of tellers


## Install
```
// use npm
npm install --save detherGateway

// use yarn
yarn add detherGateway
```

## Example
```
git clone https://github.com/dethertech/detherGateway.git
cd detherGateway/examples
yarn
yarn run example
```

## Dev
```
git clone https://github.com/dethertech/detherGateway.git
cd detherGateway
yarn
```

## Test
```
npm test
```

## Build doc
```
# Install ESDoc
yarn

# Run ESDoc.
yarn run:doc
```

## Dependencies

* [dethercontract](https://github.com/dethertech/dethercontracts.git)
* [dotenv](https://github.com/motdotla/dotenv)
* [eth-toolbox](https://github.com/dethertech/eth-toolbox)
* [ethjs-provider-signer](https://github.com/ethjs/ethjs-provider-signer)
* [ethjs-signer](https://github.com/ethjs/ethjs-signer)
* [truffle-contract](https://github.com/trufflesuite/truffle-contract)
* [web3](https://github.com/ethereum/web3.js/)


## Dev Dependencies

* [babel-cli](https://github.com/babel/babel/tree/master/packages/babel-cli)
* [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core)
* [babel-eslint](https://github.com/babel/babel-eslint)
* [babel-polyfill](https://github.com/babel/babel/tree/master/packages/babel-polyfill)
* [babel-preset-latest](https://github.com/babel/babel/tree/master/packages/babel-preset-latest)
* [bignumber.js](https://github.com/MikeMcl/bignumber.js)
* [chai](https://github.com/chaijs/chai)
* [chai-as-promised](https://github.com/domenic/chai-as-promised)
* [esdoc](https://github.com/esdoc/esdoc)
* [esdoc-standard-plugin](https://github.com/esdoc/esdoc-plugins)
* [eslint](https://github.com/eslint/eslint)
* [eslint-config-airbnb-base](https://github.com/airbnb/javascript)
* [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)
* [mocha](https://github.com/mochajs/mocha)

## Bugs

When you find issues, please report them:

* web: [https://github.com/dethertech/detherGateway/issues](https://github.com/dethertech/detherGateway/issues)

## License

* __MIT__: [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)

## Donation
* [Ethereum Fundation](https://ethereum.org/donate)
* [Etherscan](https://etherscan.io/address/0x71c7656ec7ab88b098defb751b7401b5f6d8976f)
* [MyEtherWallet](https://etherscan.io/address/0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8)
