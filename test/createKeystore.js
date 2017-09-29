// eslint-disable-next-line
import lightwallet from 'eth-lightwallet';

export const generateRandomSeed = entropy =>
  lightwallet.then(module => module.keystore.generateRandomSeed(entropy));

// export const deserialize = serialized =>
//   lightwallet.then(module => module.keystore.deserialize(serialized));

export const createVault = data =>
  lightwallet.then(module => (
    new Promise((res, rej) => {
      module.keystore.createVault(data, (err, ks) => {
        if (err) rej(err);
        else res(ks);
      });
    })
  ));

export const entropy = 123;
export const password = 'Dether@1';

export const createKeystore = async () => {
  const extraEntropy = entropy.toString();
  const seed = await generateRandomSeed(extraEntropy);
  const ks = await createVault({ password, seedPhrase: seed, hdPathString: "m/44'/60'/0'/0" });
  return ks;
};
