/**
 * @param {string} input address ethereum
 * @return {string} formated address ethereum
 */
const add0x = (input) => {
  if (typeof (input) !== 'string') return input;
  else if (input.length < 2 || input.slice(0, 2) !== '0x') return `0x${input}`;
  return input;
};

export default add0x;
