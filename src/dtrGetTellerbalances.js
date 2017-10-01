import { UTILITYWEB3, getContractInstance } from './constants/appConstants';
import add0x from './utils/add0x';

/**
 * get dtr balance
 * @param  {string}  address ethereum address
 * @return {Promise}
 */
const dtrGetTellerbalances = async (address) => {
  const dtrContractInstance = await getContractInstance();
  const result = await dtrContractInstance.getTellerBalances.call(add0x(address));
  return UTILITYWEB3.fromWei(result.toNumber(), 'ether');
};

export default dtrGetTellerbalances;
