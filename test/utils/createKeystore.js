// eslint-disable-next-line
import lightwallet from 'eth-lightwallet';

export const generateRandomSeed = entropy => lightwallet.keystore.generateRandomSeed(entropy);

export const deserialize = serialized => lightwallet.keystore.deserialize(serialized);

export const createVault = data =>
  new Promise((res, rej) => {
    lightwallet.keystore.createVault(data, (err, ks) => {
      if (err) rej(err);
      else res(ks);
    });
  });

export const entropy = 123;
export const password = 'Dether@1';
// 
// const loadKeystore = (keystore, password) => dispatch => (
//   new Promise((res, rej) => {
//     keystore.keyFromPassword(password, (error, pwDerivedKey) => {
//       if (error) return rej(error);
//       keystore.generateNewAddress(pwDerivedKey, 1);
//       const addr = keystore.getAddresses()[0];
//       dispatch(setKeystore(keystore));
//       dispatch(setAllTsx([]));
//       return dispatch(checkNetwork()).then(() => {
//         dispatch(getBasicEthInfo(addr));
//         res(keystore);
//       });
//     });
//   })
// );

export const createKeystore = async () => {
  const extraEntropy = entropy.toString();
  const seed = await generateRandomSeed(extraEntropy);
  return createVault({ password, seedPhrase: seed, hdPathString: "m/44'/60'/0'/0" });
  // const derivKey = await ks.keyFromPassword(password)
  //
  // // , (err, derivKey) => {
  //   ks.generateNewAddress(derivKey, 1);
  //   const addr = ks.getAddresses()[0];
  //   console.log(addr);
  //   return addr;
  // });
};
