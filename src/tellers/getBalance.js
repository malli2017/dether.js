import ethToolbox from 'eth-toolbox';

import { UTILITYWEB3, getContractInstance } from '../constants/appConstants';


/**
 * get dtr balance
 * @param  {string}  address ethereum address
 * @return {Promise}
 */
const getBalance = async (address) => {
  const dtrContractInstance = await getContractInstance();
  const result = await dtrContractInstance.getTellerBalances.call(ethToolbox.utils.add0x(address));
  return UTILITYWEB3.fromWei(result.toNumber(), 'ether');
};

export default getBalance;
