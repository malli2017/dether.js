import Ethers from 'ethers';

import DetherJson from 'dethercontract/contracts/DetherInterface.json';
import DetherStorageJson from 'dethercontract/contracts/DetherStorage.json';


function getContract(ContractJson, provider) {
  const contractAddress = ContractJson.networks[provider.chainId].address;
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
