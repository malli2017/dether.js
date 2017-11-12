import Ethers from 'ethers';

import { add0x } from './utils/eth';
import { validateSellPoint, validateSendCoin, validatePassword } from './utils/validation';
import Contracts from './utils/contracts';
import Formatters from './utils/formatters';

class DetherUser {
  /**
   * Creates an instance of DetherUser.
   *
   * You may not instanciate from here, prefer from DetherJS.getUser method
   *
   * @param {object} opts
   * @param {DetherJS} opts.dether dether instance
   * @param {object} opts.encryptedWallet user wallet
   */
  constructor(opts) {
    if (!opts.dether || !opts.encryptedWallet) {
      throw new Error('Need dether instance and wallet');
    }
    /** @ignore */
    this.dether = opts.dether;
    /** @ignore */
    this.encryptedWallet = opts.encryptedWallet;
    this.address = add0x(JSON.parse(opts.encryptedWallet).address);
  }

  /**
   * Returns decrypted wallet
   *
   * @param {string} password             user password
   * @return {Wallet}     User wallet
   * @private
   * @ignore
   */
  async _getWallet(password) {
    if (!password) {
      throw new TypeError('Need password to decrypt wallet');
    }
    const wallet = await Ethers.Wallet.fromEncryptedWallet(this.encryptedWallet, password);
    wallet.provider = this.dether.provider;

    return wallet;
  }

  /**
   * Returns a custom signed contract
   * Allows to add value to a transaction
   *
   * @param {object}      opts
   * @param {string}      opts.password password to decrypt wallet
   * @param {BigNumber}   opts.value    Ether value to send while calling contract
   * @return {object}     Dether Contract
   * @private
   * @ignore
   */
  async _getCustomContract(opts) {
    if (!opts.password) {
      throw new TypeError('Need password to decrypt wallet');
    }
    const wallet = await this._getWallet(opts.password);

    const customProvider = {
      getAddress: wallet.getAddress.bind(wallet),
      provider: wallet.provider,
      sendTransaction: (transaction) => {
        if (opts.value) {
          transaction.value = opts.value;
        }
        return wallet.sendTransaction(transaction);
      },
    };

    return Contracts.getDetherContract(customProvider);
  }

  /**
   * Get user ethereum address
   * @return {Promise<string>} user ethereum address
   */
  async getAddress() {
    return this.address;
  }

  /**
   * Get user teller info
   * @return {Promise<object>}
   */
  async getInfo() {
    return this.dether.getTeller(this.address);
  }

  /**
   * Get user balance in escrow
   * @return {Promise<string>}
   */
  async getBalance() {
    return this.dether.getTellerBalance(this.address);
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
   * @param {number} sellPoint.zone       geographic zone
   * @param {number} sellPoint.rates      Margin (0-100)
   * @param {number} sellPoint.avatar     avatar id (1-9)
   * @param {number} sellPoint.currency   currency id (0-4)
   * @param {number} sellPoint.amount     Ether amount to put on escrow
   * @param {string} sellPoint.telegram   Telegram address
   * @param {string} sellPoint.username   username
   * @param {string} password             user password
   * @return {Promise<object>} Transaction
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

    const formattedSellPoint = Formatters.sellPointToContract(sellPoint);

    try {
      const customContract = await this
        ._getCustomContract({
          value: tsxAmount,
          password,
        });

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
      const minedTsx = await this.dether.provider.waitForTransaction(transaction.hash);
      return minedTsx;
    } catch (e) {
      throw new TypeError(e);
    }
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
   * @return {Promise<object>} Transaction
   */
  async sendCoin(opts, password) {
    const secu = validateSendCoin(opts);
    if (secu.error) throw new TypeError(secu.msg);
    const secuPass = validatePassword(password);
    if (secuPass.error) throw new TypeError(secuPass.msg);

    const { amount, receiver } = opts;

    const customContract = await this
      ._getCustomContract({
        password,
      });
    const transaction = await customContract
      .sendCoin(
        add0x(receiver),
        Ethers.utils.parseEther(amount.toString()),
      );
    const minedTsx = await this.dether.provider.waitForTransaction(transaction.hash);
    return minedTsx;
  }

// gas used = 26497
// gas price average (mainnet) = 25000000000 wei
// 50000 * 25000000000 = 0.001250000000000000 ETH
// need 0.001250000000000000 ETH to process this function
  /**
   * Delete sell point, this function withdraw automatically balance escrow to owner
   * @param  {string} password  Wallet password
   * @return {Promise<object>}  Transaction
   */
  async withdrawAll(password) {
    const secuPass = validatePassword(password);
    if (secuPass.error) throw new TypeError(secuPass.msg);

    const customContract = await this._getCustomContract({
      password,
    });
    const transaction = await customContract.withdrawAll();
    const minedTsx = await this.dether.provider.waitForTransaction(transaction.hash);
    return minedTsx;
  }
}


export default DetherUser;
