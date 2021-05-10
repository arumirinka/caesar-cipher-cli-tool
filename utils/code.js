const str = 'abcdefghijklmnopqrstuvwxyz';
const strLen = 26;

function shiftSymbol(sym, shift, action) {
  let resShift = (action === 'decode'
    ? (str.indexOf(sym) - +shift)
    : (str.indexOf(sym) + +shift)
    ) % strLen;
  if (resShift < 0) {
    resShift = resShift + strLen;
  }
  const res = str.charAt(resShift);
  return res;
}

function code(data, shift, action) {
  const dataArr = data.toString().split('');
  let result = '';
  dataArr.map(sym => {
    if (str.indexOf(sym) !== -1) {
      result += shiftSymbol(sym, shift, action);
    } else if (str.toUpperCase().indexOf(sym) !== -1) {
      result += shiftSymbol(sym.toLowerCase(), shift, action).toUpperCase();
    } else {
      result += sym;
    }
    return result;
  });
  return result;
}

module.exports = code;
