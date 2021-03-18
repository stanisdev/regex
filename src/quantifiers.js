'use strict';

class Quantifiers {
  plain = ['*', '+', '?'];
  group = {
    start: ['{'],
    end: ['}'],
  };
  type = '';
  pattern = '';
  started = false;

  has(char) {
    if (this.plain.includes(char)) {
      this.type = 'plain';
      this.pattern = char;
      return true;
    }
    const { start, end } = this.group;

    if (start.includes(char)) {
      this.type = 'group';
      return this.started = true;
    }
    if (end.includes(char)) {
      this.started = false;
      return true;
    }
    if (this.started) {
      this.pattern += char;
    }
  }

  getRange() {
    if (this.type == 'plain') {
      return this.#calcPlainPattern();
    } else {
      return this.#calcGroupPattern();
    }
  }

  #calcPlainPattern() {
    const methods = {
      ['?']() {
        return [0, 1];
      },
      ['+']() {
        return [1, Number.POSITIVE_INFINITY];
      },
      ['*']() {
        return [0, Number.POSITIVE_INFINITY];
      }
    };
    return methods[this.pattern]();
  }

  #calcGroupPattern() {
    let [min, max] = this.pattern.split(',');
    min = +min;
    if (typeof max == 'undefined') {
      max = min;
    }
    else if (typeof max == 'string') {
      if (max.length < 1) {
        max = Number.POSITIVE_INFINITY;
      } else {
        max = +max;
      }
    }
    return [min, max];
  }
}

module.exports = Quantifiers;
