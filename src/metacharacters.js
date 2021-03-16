'use strict';

class MetaCharacters {
  chars = ['.'];

  exists(char) {
    return this.chars.includes(char);
  }

  extract(pattern) {
    const result = pattern.split('').filter(symbol => {
      return this.chars.includes(symbol);
    });
    if (result.length > 0) {
      return result[0];
    }
  }

  ['.'](subInput) {
    return subInput.slice(0, 1);
  }
}

module.exports = MetaCharacters;