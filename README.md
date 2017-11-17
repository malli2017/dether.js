# DetherJS
[![NPM](https://nodei.co/npm/detherjs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/detherjs/)

[![Build Status](https://travis-ci.com/dethertech/dether.js.svg?token=kdsX9Y3G2xZ5ptCyzuYL&branch=master)](https://travis-ci.com/dethertech/dether.js)
[![npm version](https://badge.fury.io/js/detherjs.svg)](https://badge.fury.io/js/detherjs)
[![GitHub issues](https://img.shields.io/github/issues/dethertech/dether.js.svg)](https://github.com/dethertech/dether.js/issues)
[![GitHub stars](https://img.shields.io/github/stars/dethertech/dether.js.svg)](https://github.com/dethertech/dether.js/stargazers)


DetherJS is Javascript SDK to easily interact with [DetherContracts](https://github.com/dethertech/detherContracts)

It provides wrappers for all the public methods of the contract and formats values in and out.

## Table of Contents

* [Install](#install)
* [Docs](#doc)
* [Example](#example)
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
npm install --save dether.js
```

## Docs

Extensive documentation of all the methods can be found on the [API documentation](https://dethertech.github.io/dether.js)

## Usage

You can find more examples of method usage in [examples/usage.js](https://github.com/dethertech/dether.js/blob/master/examples/usage.js)
```js
import DetherJS from 'dether.js';

const dether = new DetherJS({ network: 'kovan' });

const allTellers = await dether.getAllTellers();

const wallet = DetherJS.Ethers.Wallet.createRandom();
const encryptedWallet = await wallet.encrypt('password');

const user = dether.getUser(encryptedWallet);
const info = await dether.getInfo();
```

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

## Bugs

When you find issues, please report them:

* web: [https://github.com/dethertech/dether.js/issues](https://github.com/dethertech/dether.js/issues)


## Donation
* [Ethereum Foundation](https://ethereum.org/donate)
* [Etherscan](https://etherscan.io/address/0x71c7656ec7ab88b098defb751b7401b5f6d8976f)
* [MyEtherWallet](https://etherscan.io/address/0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8)
