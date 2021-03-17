'use strict';

class Groups {
  chars = {
    start: ['['],
    end: [']'],
  };
  started = false;
  pattern = '';

  has(char) {
    const { start, end } = this.chars;
    if (start.includes(char)) {
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

  match(subInput) {
    let result = '';
    const tokens = this.pattern.split('');

    for (let i = 0; i < subInput.length; i++) {
      const char = subInput.slice(i, i+1);
      if (tokens.includes(char)) {
        result += char;
      } else {
        break;
      }
    }
    return result;
  }
}

module.exports = Groups;
