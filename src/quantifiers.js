'use strict';

class Quantifiers {
  list = ['*', '+', '?'];

  exists(char) {
    return this.list.includes(char);
  }

  extract(pattern) {
    return '+'; // dummy result
  }

  ['+'](matchSymbol, subInput) {
    let result = '';
    const splitted = subInput.split('');
    for (let i = 0; i < splitted.length; i++) {
      const symbol = splitted[i];
      if (symbol === matchSymbol) {
        result += symbol;
      } else {
        break;
      }
    }
    return result;
  }
}

module.exports = Quantifiers;
