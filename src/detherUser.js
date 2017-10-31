import Ethers from 'ethers';
import ethToolbox from 'eth-toolbox';
import { validateSellPoint, validateSendCoin, validatePassword } from './utils/validation';
import Contracts from './utils/contracts';
import Formatters from './utils/parsers';
// import { GAS_PRICE } from './constants/appConstants';

class DetherUser {
  constructor(opts) {
    if (!opts.dether || !opts.wallet) {
      throw new Error('Need dether instance and wallet');
    }
    this.dether = opts.dether;
    this.wallet = opts.wallet;
    this.wallet.provider = this.dether.provider;

    this.signedDetherContract = Contracts.getDetherContract(this.wallet);
  }

  /**
   * Get user ethereum address
   * @return {string} user ethereum address
   */
  getAddress() {
    return this.wallet.getAddress();
  }

  /**
   * Get user teller info
   * @return {Promise}
   */
  async getInfo() {
    return this.dether.getTeller(this.wallet.address);
  }

  /**
   * Get user balance in escrow
   * @return {Promise}
   */
  async getBalance() {
    return this.dether.getBalance(this.wallet.address);
  }

// gas used = 223319
// gas price average (mainnet) = 25000000000 wei
// 250000 * 25000000000 = 0.006250000000000000 ETH
// need 0.006250000000000000 ETH to process this function
  /**
   * Register a sell point
   * @param {object} sellPoint
   * @param {number} sellPoint.lat        latitude min -90 max +90
   * @param {number} sellPoint.lng        longitude min -180 max +180
   * @param {string} sellPoint.zone       geographic zone
   * @param {number} sellPoint.rates      Margin (0-100)
   * @param {number} sellPoint.avatar     avatar id (1-9)
   * @param {number} sellPoint.currency   currency id (0-4)
   * @param {string} sellPoint.telegram   Telegram address
   * @param {number} sellPoint.amount     Ether amount to put on escrow
   * @param {string} sellPoint.username   username
   * @param {string} password             user password
   * @return {Promise<string>} Transaction hash
   */
  async addSellPoint(sellPoint, password) {
    const secu = validateSellPoint(sellPoint);
    if (secu.error) throw new TypeError(secu.msg);
    const secuPass = validatePassword(password);
    if (secuPass.error) throw new TypeError(secuPass.msg);

    const tsxAmount = Ethers.utils.parseEther(sellPoint.amount.toString());

    // const balance = await this.wallet.getBalance();
    // TODO subtract fees if not enough balance
    // check if enough gas is present to sendCoin once after registering
    // if (balance.greaterThan(tsxAmount + (GAS_PRICE * 650000))) {
    //   tsxAmount = balance.toNumber() - (GAS_PRICE * 650000);
    //   if (tsxAmount < 0.0025) throw new TypeError('Insufficient funds');
    // }

    const customProvider = {
      getAddress: this.wallet.getAddress.bind(this.wallet),
      provider: this.dether.provider,
      sendTransaction: (transaction) => {
        transaction.value = tsxAmount;
        return this.wallet.sendTransaction(transaction);
      },
    };

    const customContract = Contracts.getDetherContract(customProvider);
    const formattedSellPoint = Formatters.sellPointToContract(sellPoint);

    const transaction = await customContract.registerPoint(
      formattedSellPoint.lat,
      formattedSellPoint.lng,
      formattedSellPoint.zone,
      formattedSellPoint.rates,
      formattedSellPoint.avatar,
      formattedSellPoint.currency,
      formattedSellPoint.telegram,
      formattedSellPoint.username,
    );

    const { hash } = transaction;

    return hash;
    /* TODO ??
    return {
      from: ethToolbox.utils.add0x(this.wallet.address),
      to: this.signedDetherContract,
      value: sellPoint.amount,
      date: new Date().toLocaleString('en-US', { hour12: false }),
      dether: {
        detherContract: true,
        receive: false,
      },
      etherscan: {
        kovan: `https://kovan.etherscan.io/tx/${hash}`,
        ropsten: `https://ropsten.etherscan.io/tx/${hash}`,
        ether: `https://etherscan.io/tx/${hash}`,
      },
    };
    */
  }

// gas used = 95481
// gas price average (mainnet) = 25000000000 wei
// 115000 * 25000000000 = 0.002875000000000000 ETH
// need 0.006250000000000000 ETH to process this function
  /**
   * Send eth from escrow
   * @param  {object}  opts
   * @param  {string}  opts.receiver Receiver ethereum address
   * @param  {number}  opts.amount   Amount to send
   * @param  {string}  password      Wallet password
   * @return {Promise<string>} Transaction hash
   */
  async sendCoin(opts, password) {
    const secu = validateSendCoin(opts);
    if (secu.error) throw new TypeError(secu.msg);
    const secuPass = validatePassword(password);
    if (secuPass.error) throw new TypeError(secuPass.msg);

    const { amount, receiver } = opts;

    const transaction = await this.signedDetherContract
      .sendCoin(
        ethToolbox.utils.add0x(receiver),
        parseInt(this.dether.web3.toWei(amount, 'ether'), 10),
      );

    return transaction.hash;
  }


// gas used = 26497
// gas price average (mainnet) = 25000000000 wei
// 50000 * 25000000000 = 0.001250000000000000 ETH
// need 0.001250000000000000 ETH to process this function
  /**
   * Delete sell point, this function withdraw automatically balance escrow to owner
   * @param  {string} password  Wallet password
   * @return {Promise<string>}  Transaction hash
   */
  async withdrawAll(password) {
    const secuPass = validatePassword(password);
    if (secuPass.error) throw new TypeError(secuPass.msg);

    const transaction = await this.signedDetherContract.withdrawAll();

    return transaction.hash;
  }
}


export default DetherUser;