import Ethers from 'ethers';

import DetherJson from 'dethercontract/contracts/DetherInterface.json';
import DetherStorageJson from 'dethercontract/contracts/DetherStorage.json';

function getContract(ContractJson, provider) {
  let chainId = null;
  if (provider instanceof Ethers.Wallet) {
    chainId = provider.provider.chainId;
  } else {
    chainId = provider.chainId;
  }
  if (!chainId) {
    throw new Error('No chain id found');
  }
  const network = ContractJson.networks[chainId];
  if(!network) {
    throw new Error(`Contract not deployed on network ${chainId}`);
  }
  const contractAddress = ContractJson.networks[chainId].address;
  const contractABI = ContractJson.abi;

  return new Ethers.Contract(contractAddress, contractABI, provider);
}

function getDetherContract(provider) {
  return getContract(DetherJson, provider);
}

function getDetherStorageContract(provider) {
  return getContract(DetherStorageJson, provider);
}

export default {
  getDetherContract,
  getDetherStorageContract,
};
