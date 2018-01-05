import bip39 from 'bip39';
import SimpleCryptoJS from 'simple-crypto-js';


export const createMnemonic = () => bip39.generateMnemonic();

export const encryptMnemonic = (mnemonic, passphrase) => {
  const simpleCrypto = new SimpleCryptoJS(passphrase);
  const cipherText = simpleCrypto.encrypt(mnemonic);
  return cipherText;
};

export const decryptMnemonic = (cipherText, passphrase) => {
  const simpleCrypto = new SimpleCryptoJS(passphrase);
  const decipherText = simpleCrypto.decrypt(cipherText);
  return decipherText;
};
