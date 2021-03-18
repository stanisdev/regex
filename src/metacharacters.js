'use strict';

class MetaCharacters {
  chars = {
    plain: ['.'],
    backSlash: '\\',
  };
  escaped = ['s', 'd', 'S'];
  started = false;
  pattern = '';
  type = '';
  result = '';

  has(char) {
    const { chars } = this;
    if (chars.plain.includes(char)) {
      this.pattern = char;
      this.type = 'plain';
      return true;
    }
    else if (char == chars.backSlash) {
      return this.started = true;
    }
    if (this.started) {
      this.pattern = char;
      this.started = false;
      this.type = 'escaped';
      return true;
    }
  }

  match(char) {
    if (this.type == 'escaped') {
      return this.#compareEscaped(char);
    } else {
      return this.#comparePlain(char);
    }
  }

  #compareEscaped(char) {
    const methods = {
      d() {
        return Number.isInteger(+char);
      },
      s() {},
      S() {},
    };
    return methods[this.pattern]();
  }

  #comparePlain(char) {
    const methods = {
      ['.']() {
        return true;
      }
    };
    return methods[this.pattern]();
  }
}

module.exports = MetaCharacters;
