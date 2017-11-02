import isAddr from './isAddr';

/**
 * Return formated address ethereum
 * @param {string} input address ethereum
 * @return {string}      formated address ethereum or false
 */
const add0x = (input) => {
  if (!input || typeof (input) !== typeof '' || !isAddr(input)) return false;
  return input.slice(0, 2) !== '0x' ? `0x${input}` : input;
};

export default add0x;
