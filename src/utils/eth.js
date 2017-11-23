import utf8 from 'utf8';

/**
 * Test if addr is ethereum address
 * @param  {string}  addr eth address
 * @return {Boolean}
 */
export const isAddr = addr => /^(0x)?[0-9a-f]{40}$/i.test(addr) || /^(0x)?[0-9a-f]{64}$/i.test(addr);

/**
 * Return formated address ethereum
 * @param {string} input address ethereum
 * @return {string}      formated address ethereum or false
 */
export const add0x = (input) => {
  if (!input || typeof (input) !== typeof '' || !isAddr(input)) {
    throw new Error('Invalid address');
  }
  return input.slice(0, 2) !== '0x' ? `0x${input}` : input;
};

/**
 * @ignore
 * Return formated hexa string
 * @param  {string} hex encoded string
 * @return {string}     decoded string
 */
export const toUtf8 = (hex) => {
  if (!hex || typeof hex !== 'string') throw new Error('Invalid args');

  let str = '';

  for (let i = hex.substring(0, 2) === '0x' ? 2 : 0;
    i < hex.length; i += 2) {
      const code = parseInt(hex.substr(i, 2), 16);
      if (code === 0) break;
      str += String.fromCharCode(code);
  }

  try {
    return utf8.decode(str);
  } catch (e) {
    return '';
  }
};
