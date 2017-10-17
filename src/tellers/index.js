import dtrRegisterPoint from './addTellers';
import getBalance from './getBalance';
import withdrawAll from './deleteSellPoint';
import {
  dtrGetTeller,
  getTellersPerZone,
  getAllTellers,
} from './getTellers';

const tellers = {
  // Add teller
  add: dtrRegisterPoint,

  // Get Tellers
  get: dtrGetTeller,
  getZone: getTellersPerZone,
  getAll: getAllTellers,

  // Get Teller balance
  balance: getBalance,

  // Remove teller
  del: withdrawAll,
};

export default tellers;
