/* global describe it */
import { expect } from 'chai';
import sinon  from 'sinon';
import DetherJS from '../../src/detherJs';
import DetherUser from '../../src/detherUser';

import contractMock from '../mock/contract';
import storageMock from '../mock/storage';


describe('dether user', () => {

  let dether, user, stubs = [];

  beforeEach(async () => {
    stubs = [];

    dether = new DetherJS({
      network: 'kovan',
    });

    dether.contractInstance = contractMock;
    dether.storageInstance = storageMock;

    const keystore = {
      address: () => '0x0c6dd5b28707a045f3a0c7429ed3fb9f835cb623',
    };

    user = new DetherUser({ dether, keystore });
  });

  afterEach(() => {
    stubs.forEach(s => s.restore());
    stubs = [];
  });

  it('should instanciate', async () => {
    const detheruser = new DetherUser({
      dether: 'dether',
      keystore: 'keystore',
    });
    expect(detheruser.dether).to.eq('dether');
    expect(detheruser.keystore).to.eq('keystore');
  });

  it('should get user info', async () => {
    const stub = sinon.stub(dether, 'getTeller');

    stub.returns('info');

    const info = await user.getInfo();
    expect(info).to.eq('info');

    stub.restore();
  });

  it('should get user escrow balance', async () => {
    const balance = await user.getBalance();
    expect(balance).to.eq(1000);
  });
});