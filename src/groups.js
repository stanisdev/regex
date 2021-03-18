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
      this.pattern = this.pattern.split('');
      this.started = false;
      return true;
    }
    if (this.started) {
      this.pattern += char;
    }
  }

  match(char) {
    return this.pattern.includes(char);
  }
}

module.exports = Groups;
