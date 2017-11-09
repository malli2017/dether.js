# DetherJS
[![Build Status](https://travis-ci.com/dethertech/detherGateway.svg?token=kdsX9Y3G2xZ5ptCyzuYL&branch=master)](https://travis-ci.com/dethertech/detherGateway) ![npm](https://img.shields.io/npm/v/detherGateway.svg)

DetherJS is Javascript SDK to easily interact with [DetherContracts](https://github.com/dethertech/detherContracts)

It provides wrappers for all the public methods of the contract and formats values in and out.

V1.0.0
[V0.x](https://github.com/dethertech/dether.js/tree/v0.x)
## Table of Contents

* [Install](#install)
* [Docs](#doc)
* [Example](#example)
* [Dev](#dev)
* [Test](#test)
* [Build doc](#build-doc)
* [Dependencies](#dependencies)
* [Bugs](#bugs)
* [License](#license)
* [Donation](#donation)

## Install

Use NPM to get the package

```
npm install --save dether.js
```

## Docs

Extensive documentation of all the methods can be found on the [API documentation](https://dethertech.github.io/dether.js)

## Usage

You can find more examples of method usage in [examples/usage.js](https://github.com/dethertech/dether.js/blob/v1.x/examples/usage.js)
```
import DetherJS from 'dether.js';

const dether = new DetherJS({ network: 'kovan' });
const allTellers = await dether.getAllTellers();

const wallet = DetherJS.Wallet.createRandom();
const encryptedWallet = await wallet.encrypt('password');

const user = dether.getUser(encryptedWallet);
const info = await dether.getInfo();
```

## Dev
```
git clone https://github.com/dethertech/dether.js.git
cd dether.js
npm i
```

## Test
```
npm test
```

## Build doc
```
npm run esdoc
```

## Dependencies

* [dethercontract](https://github.com/dethertech/dethercontracts.git)
* [eth-toolbox](https://github.com/dethertech/eth-toolbox)
* [web3](https://github.com/ethereum/web3.js/)
* [ethers.js](https://github.com/ethers-io/ethers.js)

## Bugs

When you find issues, please report them:

* web: [https://github.com/dethertech/dether.js/issues](https://github.com/dethertech/dether.js/issues)

## License

* __MIT__: [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)

## Donation
* [Ethereum Foundation](https://ethereum.org/donate)
* [Etherscan](https://etherscan.io/address/0x71c7656ec7ab88b098defb751b7401b5f6d8976f)
* [MyEtherWallet](https://etherscan.io/address/0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8)
