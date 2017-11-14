/* global describe it beforeEach afterEach */
import { expect } from 'chai';
import Ethers from 'ethers';
import sinon from 'sinon';
import DetherJS from '../../src/detherJs';
import DetherUser from '../../src/detherUser';
import Wallet from '../../src/wallet';
import Contracts from '../../src/utils/contracts';

import contractMock from '../mock/contract';

describe('dether user', () => {
  let dether = [];
  let wallet = [];
  let user = [];
  let stubs = [];

  beforeEach(async () => {
    stubs = [];

    dether = new DetherJS({
      network: 'kovan',
    });

    wallet = Wallet.createRandom();
    const encryptedWallet = await wallet.encrypt('password');
    user = new DetherUser({ dether, encryptedWallet });

    user.signedDetherContract = contractMock;
  });

  afterEach(() => {
    stubs.forEach(s => s.restore && s.restore());
    stubs = [];
  });

  it('should instanciate', async () => {
    const password = 'password';
    const wallet = Wallet.createRandom();
    const encryptedWallet = await wallet.encrypt(password);

    const dether = { provider: { chainId: 42 } };
    const stub = sinon.stub(Contracts, 'getDetherContract').returns('contract');

    const detheruser = new DetherUser({
      dether,
      encryptedWallet,
    });
    expect(detheruser.dether).to.eq(dether);
    expect(detheruser.encryptedWallet).to.eq(encryptedWallet);

    const decryptedWallet =
      await Ethers.Wallet.fromEncryptedWallet(detheruser.encryptedWallet, password);
    expect(decryptedWallet.privateKey).to.eq(wallet.privateKey);

    stub.restore();
  });

  it('should get wallet', async () => {
    const customWallet = {};
    dether.provider = 'provider';

    const restore = Ethers.Wallet;
    Ethers.Wallet = {
      fromEncryptedWallet: sinon.stub().returns(customWallet),
    };

    const wallet = await user._getWallet('password');

    expect(Ethers.Wallet.fromEncryptedWallet.calledWith(user.encryptedWallet, 'password')).to.be.true;
    expect(wallet.provider).to.eq('provider');

    Ethers.Wallet = restore;
  });

  it('should create special contract', async () => {
    const stub = sinon.stub();
    stub.returns('result');

    stubs.push(sinon.stub(Contracts, 'getDetherContract'));
    stubs[0].returns('res');

    const customWallet = {
      sendTransaction: stub,
      getAddress: () => 'address',
      provider: 'provider',
    };

    stubs.push(sinon.stub(user, '_getWallet'));
    stubs[1].returns(customWallet);

    const customContract = await user._getCustomContract({
      value: 1.2,
      password: 'password',
    });

    expect(customContract).to.eq('res');
    const customProvider = stubs[0].args[0][0];

    expect(customProvider.getAddress()).to.eq('address');
    expect(customProvider.provider).to.eq('provider');

    const transactionResult = customProvider.sendTransaction({});
    expect(transactionResult).to.eq('result');
    expect(stub.calledWith({ value: 1.2 })).to.be.true;
    expect(stubs[1].calledWith('password')).to.be.true;
  });

  it('should get user address', async () => {
    const address = await user.getAddress();
    expect(address).to.eq(wallet.address.toLowerCase());
  });

  it('should get user info', async () => {
    const stub = sinon.stub(dether, 'getTeller');
    stub.returns('info');

    const info = await user.getInfo();

    expect(stub.calledWith(wallet.address.toLowerCase())).to.be.true;
    expect(info).to.eq('info');

    stub.restore();
  });

  it('should get user escrow balance', async () => {
    const stub = sinon.stub(dether, 'getTellerBalance');
    stub.returns('balance');
    const balance = await user.getBalance();

    expect(stub.calledWith(wallet.address.toLowerCase())).to.be.true;
    expect(balance).to.eq('balance');

    stub.restore();
  });

  // TODO
  it('should register point', async () => {
    const sellPoint = {
      lat: 1,
      lng: 2,
      zone: 42,
      rates: 20.20,
      avatar: 1,
      currency: 2,
      telegram: 'abc',
      username: 'cba',
      amount: 0.01,
    };

    stubs.push(sinon.stub());
    stubs[0].returns({
      hash: 'hash',
    });
    stubs.push(sinon.stub(user, '_getCustomContract'));
    stubs[1].returns({
      registerPoint: stubs[0],
    });

    const result = await user.addSellPoint(sellPoint, 'password');
    expect(result).to.deep.eq({
      hash: 'hash',
    });

    expect(stubs[0].args[0][0]).to.eq(100000);
    expect(stubs[0].args[0][1]).to.eq(200000);
    expect(stubs[0].args[0][2]).to.eq(42);
    expect(stubs[0].args[0][3]).to.eq(2020);
    expect(stubs[0].args[0][4]).to.eq(1);
    expect(stubs[0].args[0][5]).to.eq(2);
    expect(stubs[0].args[0][6][0]).to.eq(97);
    expect(stubs[0].args[0][6][1]).to.eq(98);
    expect(stubs[0].args[0][6][2]).to.eq(99);
    expect(stubs[0].args[0][7][0]).to.eq(99);
    expect(stubs[0].args[0][7][1]).to.eq(98);
    expect(stubs[0].args[0][7][2]).to.eq(97);

    const transactionValue = Ethers.utils.parseEther('0.01');
    expect(stubs[1].args[0][0].value.eq(transactionValue)).to.be.true;
    expect(stubs[1].args[0][0].password).to.eq('password');
  });

  it('should send coin', async () => {
    const opts = {
      amount: 1,
      receiver: '0x085b30734fD4f48369D53225b410d7D04b2d9011',
    };

    stubs.push(sinon.stub());
    stubs[0].returns({
      hash: 'hash',
    });
    stubs.push(sinon.stub(user, '_getCustomContract'));
    stubs[1].returns({
      sendCoin: stubs[0],
    });

    const result = await user.sendToBuyer(opts, 'password');
    expect(result).to.deep.eq({
      hash: 'hash',
    });

    expect(stubs[0].calledWith(
      '0x085b30734fD4f48369D53225b410d7D04b2d9011',
      Ethers.utils.parseEther('1'),
    )).to.be.true;
    expect(stubs[1].args[0][0].password).to.eq('password');
  });

  it('should withdraw all', async () => {
    stubs.push(sinon.stub());
    stubs[0].returns({
      hash: 'hash',
    });
    stubs.push(sinon.stub(user, '_getCustomContract'));
    stubs[1].returns({
      withdrawAll: stubs[0],
    });

    const result = await user.deleteSellPoint('password');
    expect(result).to.deep.eq({
      hash: 'hash',
    });
    expect(stubs[1].args[0][0].password).to.eq('password');
  });
});
