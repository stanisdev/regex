'use strict';

class Groups {
  chars = {
    start: ['['],
    end: [']'],
  };
  started = false;
  pattern = '';
  negative = false;
  alphabet = 'abcdefghijklmnopqrstuvwxyz';

  has(char) {
    const { start, end } = this.chars;
    if (start.includes(char)) {
      return this.started = true;
    }
    if (end.includes(char)) {
      this.pattern = this.pattern.split('');
      this.started = false;
      return true;
    }
    if (this.started) {
      this.pattern += char;
    }
  }

  match(char) {
    const result = this.pattern.includes(char);
    if (this.negative) {
      return !result;
    }
    return result;
  }

  beforeMatch() {
    const { pattern } = this;

    if (pattern[0] == '^') {
      pattern.splice(0, 1);
      this.negative = true;
    }
    this.#findRanges();
  }

  #findRanges() {
    const { pattern } = this;

    const ranges = [];
    if (pattern.includes('-')) {
      for (let a = 0; a < pattern.length; a++) {
        const index = pattern.indexOf('-');
        if (index < 0) {
          break;
        }
        ranges.push([
          pattern[index - 1],
          pattern[index + 1]
        ]);
        pattern.splice(index - 1, 3);
      }
    }
    if (ranges.length > 0) {
      ranges.forEach(this.#convertRange, this);
    }
  }

  #convertRange([from, to]) {
    const { alphabet, pattern } = this;

    if (Number.isInteger(+from)) {
      while (from <= to) {
        pattern.push(from.toString());
        from++;
      }
      return;
    }
    else if (alphabet.includes(from)) {
      let start = alphabet.indexOf(from);
      const end = alphabet.indexOf(to);
      
      while (start <= end) {
        const char = alphabet.substr(start, 1);
        pattern.push(char);
        start++;
      }
      return;
    }
    throw 0;
  }
}

module.exports = Groups;
