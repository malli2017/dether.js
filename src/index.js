// Smart contract
import dtrRegisterPoint from './addSellPoint';
import withdrawAll from './deleteSellPoint';
import dtrGetTellerbalances from './dtrGetTellerbalances';
import dtrSendCoin from './dtrSendCoin';
import getAllTsx from './getAllTsx';
import { getTellersPerZone, getAllTellers } from './getTellers';

// Ethereum
import getEthBalance from './getEthBalance';
import sendEther from './sendEth';

require('dotenv').config({ path: '.env' });


const detherGateway = {
  dtrRegisterPoint,
  withdrawAll,
  dtrGetTellerbalances,
  dtrSendCoin,
  getAllTsx,
  getTellersPerZone,
  getAllTellers,
  getEthBalance,
  sendEther,
};

export default detherGateway;
