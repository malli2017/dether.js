/**
 * Test if addr is ethereum address
 * @param  {string}  addr eth address
 * @return {Boolean}
 */
const isAddr = addr => /^(0x)?[0-9a-f]{40}$/i.test(addr) || /^(0x)?[0-9a-f]{64}$/i.test(addr);

export default isAddr;
