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

export const createKeystore = async () => {
  const extraEntropy = entropy.toString();
  const seed = await generateRandomSeed(extraEntropy);
  console.log('seed: ', seed);
  return createVault({ password, seedPhrase: seed, hdPathString: "m/44'/60'/0'/0" });
};
