/**
 * @ignore
 */
export const validateSellPoint = (teller) => {
  if (!teller || typeof teller !== 'object') {
    return { error: true, msg: 'Invalid args' };
  }
  if (!teller.lat || Number.isNaN(teller.lat) || teller.lat > 90 || teller.lat < -90) {
    return { error: true, msg: 'Invalid latitude' };
  }
  if (!teller.lng || Number.isNaN(teller.lng) || teller.lng > 180 || teller.lng < -180) {
    return { error: true, msg: 'Invalid longitude' };
  }
  if (!teller.zone || !Number.isInteger(teller.zone)) {
    return { error: true, msg: 'Invalid zone' };
  }
  if (!teller.rates || teller.rates <= 0 || teller.rates > 100) {
    return { error: true, msg: 'Invalid rates' };
  }
  if (!teller.avatar || !Number.isInteger(teller.avatar) || teller.avatar < 0) {
    return { error: true, msg: 'Invalid avatar' };
  }
  if (!teller.currency || !Number.isInteger(teller.currency) || teller.currency < 0) {
    return { error: true, msg: 'Invalid currency' };
  }
  if (!teller.telegram || teller.telegram.length < 3 || teller.telegram.length > 30) {
    return { error: true, msg: 'Invalid telegram' };
  }
  if (!teller.amount || Number.isNaN(teller.amount) || teller.amount < 0.01) {
    return { error: true, msg: 'Invalid amount' };
  }
  if (!teller.username || teller.username.length < 3 || teller.username.length > 30) {
    return { error: true, msg: 'Invalid username' };
  }
  return {};
};

/**
 * @ignore
 */
export const validateSendCoin = (tsx) => {
  if (!tsx || typeof tsx !== 'object') {
    return { error: true, msg: 'Invalid args' };
  }
  if (!tsx.receiver) {
    return { error: true, msg: 'Invalid receiver' };
  }
  if (!tsx.amount || Number.isNaN(tsx.amount) || tsx.amount < 0.001) {
    return { error: true, msg: 'Invalid amount' };
  }
  return {};
};

/**
 * @ignore
 */
export const validatePassword = (password) => {
  if (!password || (typeof password) !== 'string' || password.length < 1) {
    return { error: true, msg: 'Invalid password' };
  }
  return {};
};

/**
 * @ignore
 */
export const validateGetCustomContract = (opts) => {
  if (!opts || typeof opts !== 'object') {
    return { error: true, msg: 'No params found' };
  }
  if (!opts.wallet || typeof opts.wallet !== 'object') {
    return { error: true, msg: 'Invalid wallet' };
  }
  if (!opts.password || typeof opts.password !== 'string') {
    return { error: true, msg: 'Need password to decrypt wallet' };
  }
  return {};
};
