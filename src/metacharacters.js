'use strict';

class MetaCharacters {
  chars = {
    plain: ['.'],
    backSlash: '\\',
  };
  escaped = ['s', 'd', 'S'];
  started = false;
  pattern = '';

  has(char) {
    const { chars } = this;
    if (chars.plain.includes(char)) {
      this.pattern = char;
      return true;
    }
    else if (char == chars.backSlash) {
      return this.started = true;
    }
    if (this.started) {
      this.pattern = char;
      this.started = false;
      return true;
    }
  }

  match(subInput) {
    let result = '';

    for (let i = 0; i < subInput.length; i++) {
      const char = subInput.slice(i, i+1);
      // @todo: match depending on pattern
    }
  }
}

module.exports = MetaCharacters;
