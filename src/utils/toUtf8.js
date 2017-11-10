import utf8 from 'utf8';

const toUtf8 = (hex) => {
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
    return 'Dether';
  }
};

export default toUtf8;
