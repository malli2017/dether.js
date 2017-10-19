/* global describe it before */
import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import ethToolbox from 'eth-toolbox';

import add0x from '../src/utils/add0x';
import { getSignedContract, getSignedWeb3 } from '../src/utils/contractInstance';
import decodeKeystore from '../src/utils/decodeKeystore';
import { createKeystore, password } from './utils/createKeystore';


chai.use(chaiAsPromised);
chai.should();

const { expect } = chai;
const privateKey = process.env.DETHER_PRIVATEKEY_ACCOUNT_TEST;
const address = process.env.DETHER_ADDRESS_ACCOUNT_TEST;
let keystore = null;

before((done) => {
  console.log('------------')
  console.log(ethToolbox)
  console.log('------------')

  createKeystore().then((ks) => {
    ks.keyFromPassword(password, (error, pwDerivedKey) => {
      ks.generateNewAddress(pwDerivedKey, 1);
      keystore = ks;
      done();
    });
  })
  .catch((e) => {
    console.log(e);
  });
});

// Test decodeKeystore
describe('decodeKeystore', () => {
  it('should is a function', () => {
    expect(typeof decodeKeystore).to.equal('function');
  });

  it('should return address and privateKey', async () => {
    try {
      const test = await decodeKeystore(keystore, password);
      expect(typeof test).to.equal('object');
    } catch (e) {
      console.log(e);
      expect(e).to.equal(null);
    }
  });

  it('should return error', async () => {
    try {
      await decodeKeystore(null, password);
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should return error', async () => {
    try {
      await decodeKeystore(null, null);
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should return error', async () => {
    try {
      await decodeKeystore(keystore, null);
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
});

// Test add0x utils
describe('add0x', () => {
  it('should is a function', () => {
    expect(typeof add0x).to.equal('function');
  });

  it('should return formatted address with good arguments', () => {
    const resultWithout0x = add0x('b1FF3D6506f8250e8bAd1E897c5Ca0B32656D112');
    const resultWith0x = add0x('0xb1FF3D6506f8250e8bAd1E897c5Ca0B32656D112');

    resultWithout0x.should.equal('0xb1FF3D6506f8250e8bAd1E897c5Ca0B32656D112');
    resultWith0x.should.equal('0xb1FF3D6506f8250e8bAd1E897c5Ca0B32656D112');
  });

  it('should return arguments if not typeof string', () => {
    const errorArgs = add0x({ test: 'wrong arguments' });

    errorArgs.should.deep.equal({ test: 'wrong arguments' });
  });
});

// Test getSignedContract utils
describe('getSignedContract', () => {
  it('should is a function', () => {
    expect(typeof getSignedContract).to.equal('function');
  });

  it('should return dtrContract instance', async () => {
    try {
      const test = await getSignedContract(privateKey, address);
      expect(typeof test).to.equal('object');
    } catch (e) {
      console.log(e);
      expect(e).to.equal(null);
    }
  });

  it('should return error', async () => {
    try {
      await getSignedContract();
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
});

// Test getSignedWeb3 utils
describe('getSignedWeb3', () => {
  it('should is a function', () => {
    expect(typeof getSignedWeb3).to.equal('function');
  });

  it('should return web3 provider', async () => {
    try {
      const test = await getSignedWeb3(privateKey, address);
      expect(typeof test).to.equal('object');
    } catch (e) {
      console.log(e);
      expect(e).to.equal(null);
    }
  });

  it('should return error', async () => {
    try {
      await getSignedWeb3();
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });
});
