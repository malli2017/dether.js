
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
  if (!input || typeof (input) !== typeof '' || !isAddr(input)) return false;
  return input.slice(0, 2) !== '0x' ? `0x${input}` : input;
};

