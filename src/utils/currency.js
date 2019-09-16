export function convertJapanCurrency(number) { //eslint-disable-line
  // const newNumber = typeof number !== 'number' ? parseInt(number, 10) : number;
  // if (typeof newNumber === 'number' && newNumber > 0) {
  //   return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(newNumber);
  // }
  const newNumber = typeof number !== 'number' ? parseInt(number, 10) : number;
  if (typeof newNumber === 'number' && newNumber > 0) {
    return new Intl.NumberFormat({ style: 'number', currency: '' }).format(newNumber);
  }
  return number;
}

export function convertCurrency(number) { //eslint-disable-line
  const newNumber = typeof number !== 'number' ? parseInt(number, 10) : number;
  if (typeof newNumber === 'number' && newNumber > 0) {
    return new Intl.NumberFormat({ style: 'number', currency: '' }).format(newNumber);
  }
  return number;
}

export function numberWithCommas(x) {
  return x && x.toLocaleString();
}
