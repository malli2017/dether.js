/**
 * @param {object} keystore
 * @param {string} password
 * @return {object} return privateKey and ethereum address
 */
const decodeKeystore = (keystore, password) =>
  new Promise((resolve, reject) => {
    if (!keystore || !password) return reject(new TypeError('Invalid arguments'));

    return keystore.keyFromPassword(password, (err, pwDerivedKey) => {
      if (err) return reject(err);

      if (!keystore.isDerivedKeyCorrect(pwDerivedKey)) {
        return reject(new TypeError('Invalid password'));
      }

      const address = keystore.getAddresses()[0];
      const privateKey = keystore.exportPrivateKey(address, pwDerivedKey);

      return resolve({
        address,
        privateKey,
      });
    });
  });

export default decodeKeystore;
