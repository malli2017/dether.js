/* global describe it */
import { expect } from 'chai';
import sinon  from 'sinon';
import DetherJS from '../../src/detherJs';
import DetherUser from '../../src/detherUser';
import Wallet from '../../src/wallet';
import Contracts from '../../src/utils/contracts';

import contractMock from '../mock/contract';

describe('dether user', () => {

  let dether, wallet, user, stubs = [];

  beforeEach(async () => {
    stubs = [];

    dether = new DetherJS({
      network: 'kovan',
    });

    wallet = Wallet.createRandom();

    user = new DetherUser({ dether, wallet });

    user.signedDetherContract = contractMock;
  });

  afterEach(() => {
    stubs.forEach(s => s.restore());
    stubs = [];
  });

  it('should instanciate', async () => {
    const wallet = Wallet.createRandom();
    const dether = { provider: { chainId: 42 } };
    const stub = sinon.stub(Contracts, 'getDetherContract').returns('contract');

    const detheruser = new DetherUser({
      dether,
      wallet,
    });
    expect(detheruser.dether).to.eq(dether);
    expect(detheruser.wallet).to.eq(wallet);
    expect(detheruser.wallet.provider).to.eq(dether.provider);
    expect(detheruser.signedDetherContract).to.eq('contract');

    stub.restore();
  });

  it('should get user info', async () => {
    const stub = sinon.stub(dether, 'getTeller');
    stub.returns('info');

    const info = await user.getInfo();
    expect(stub.calledWith(wallet.address)).to.be.true;
    expect(info).to.eq('info');

    stub.restore();
  });

  it('should get user escrow balance', async () => {
    const stub = sinon.stub(dether, 'getBalance');
    stub.returns('balance');

    const balance = await user.getBalance();
    expect(stub.calledWith(wallet.address)).to.be.true;
    expect(balance).to.eq('balance');

    stub.restore();
  });

  // TODO
  it.skip('should register point', async () => {
    const sellPoint = {};
    const result = await user.addSellPoint(sellPoint, 'password');
    expect(result.ok).to.eq(1);
  });

  it('should send coin', async () => {
    const opts = {
      amount: 1,
      receiver: '0x085b30734fD4f48369D53225b410d7D04b2d9011',
    };
    const stub = sinon.stub(user.signedDetherContract, 'sendCoin');
    stub.returns('transaction');

    const result = await user.sendCoin(opts, 'password');
    expect(result).to.eq('transaction');

    expect(stub.calledWith(
      '0x085b30734fD4f48369D53225b410d7D04b2d9011',
      1000000000000000000,
    )).to.be.true;

    stub.restore();
  });

  it('should withdraw all', async () => {
    const result = await user.withdrawAll('password');
    expect(result.ok).to.eq(1);
  });
});