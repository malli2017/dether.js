import ethToolbox from 'eth-toolbox';
import { validateSellPoint } from './utils/validation';
import { GAS_PRICE, getSignedDetherContract } from './constants/appConstants';

class DetherUser {
  constructor(opts) {
    if (!opts.dether || !opts.keystore) {
      throw new Error('Need dether instance and keystore');
    }
    this.dether = opts.dether;
    this.keystore = opts.keystore;
  }

  /**
   * get user info
   * @return {Promise}
   */
  async getInfo() {
    const address = this.keystore.address();
    return this.dether.getTeller(address);
  }

  /**
   * get dtr balance
   * @return {Promise}
   */
  async getBalance() {
    const address = this.keystore.address();
    return this.dether.getBalance(address);
  }

  async _getSignedContract(password) {
    const key = await ethToolbox.decodeKeystore(this.keystore, password);

    if (!key || !key.privateKey || !key.address || !ethToolbox.utils.isAddr(key.address)) {
      throw new TypeError('Invalid keystore or password');
    }

    const { address } = key;
    const signedContact = getSignedDetherContract(key.privateKey, key.address, this.dether.providerUrl);

    return {
      signedContact,
      address,
    };
  }


// gas used = 223319
// gas price average (mainnet) = 25000000000 wei
// 250000 * 25000000000 = 0.006250000000000000 ETH
// need 0.006250000000000000 ETH to process this function
  /**
   * @param {number} lat latitude min -90 max +90
   * @param {number} lng longitude min -180 max +180
   * @param {string} zone geographic zone
   * @param {number} rates Margin (0-100 * 100)
   * @param {number} avatar (1-9)
   * @param {number} currency number (0-4)
   * @param {string} telegam pseudo telegram
   * @param {number} amount escrow
   * @param {string} username username
   * @param {object} keystore deserialize keystore
   * @param {string} password
   * @param {string} providerUrl
   * @return {object} Return txs
   */
  async addSellPoint(sellPoint, password) {
    const secu = validateSellPoint(sellPoint);

    if (secu.error) throw new TypeError(secu.msg);

    const { dtrContractInstance, address } = await this._getSignedContract(password);

    let tsxAmount = parseInt(this.dether.web3.toWei(sellPoint.amount, 'ether'), 10);

    const balance = await this.dether.web3.eth.getBalance(address);
    // check if enough gas is present to sendCoin once after registering
    if (balance.toNumber() < (tsxAmount + (GAS_PRICE * 650000))) {
      tsxAmount = balance.toNumber() - (GAS_PRICE * 650000);
      if (tsxAmount < 0.0025) throw new TypeError('Insufficient funds');
    }

    const result = await dtrContractInstance.registerPoint(
      sellPoint.lat.toFixed(6) * (10 ** 5),
      sellPoint.lng.toFixed(6) * (10 ** 5),
      sellPoint.zone,
      sellPoint.rates * 100,
      sellPoint.avatar,
      sellPoint.currency,
      sellPoint.telegram,
      sellPoint.username,
      {
        from: ethToolbox.utils.add0x(address),
        value: parseInt(tsxAmount, 10),
        gas: 450000,
        gasPrice: GAS_PRICE,
      },
    );
    return {
      from: ethToolbox.utils.add0x(address),
      to: dtrContractInstance.address,
      value: sellPoint.amount,
      date: new Date().toLocaleString('en-US', { hour12: false }),
      dether: {
        detherContract: true,
        receive: false,
      },
      etherscan: {
        kovan: `https://kovan.etherscan.io/tx/${result}`,
        ropsten: `https://ropsten.etherscan.io/tx/${result}`,
        ether: `https://etherscan.io/tx/${result}`,
      },
    };
  }

}


export default DetherUser;