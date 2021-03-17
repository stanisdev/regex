'use strict';

const MetaCharacters = require('./metacharacters');
const Quantifiers = require('./quantifiers');
const Groups = require('./groups');

class RegEx {
  metaCharacters = new MetaCharacters();
  quantifiers = new Quantifiers();
  groups = new Groups(); 
  result = ''
  counter = 0;
  patternStarted = false;

  /**
   * Constructor
   * @param {string} input - Being tested string
   * @param {string} expression - Regular expression
   */
   constructor(input, expression) {
    this.input = input;
    this.expression = expression;
    this.#prepare();
  }

  /**
   * Compare input string with expression to find matching
   */
  match() {
    const { splitted } = this;
    for (let i = 0; i < splitted.expression.length; i++) {
      const token = splitted.expression[i];

      if (this.#isSpecialSymbol(token)) {
        this.patternStarted = true;
      }
      else {
        if (this.patternStarted) {
          this.#processPattern();
        }
        this.result += token;
        this.counter++;
      }
    }
  }

  /**
   * Process the assembled pattern
   */
  #processPattern() {
    this.patternStarted = false;
    
    const subInput = this.input.slice(this.counter);
    const [min, max] = this.quantifiers.getRange();

    let result;
    if (this.groups.pattern.length > 0) {
      result = this.groups.match(subInput);
    }
    else {
      result = this.metaCharacters.match(subInput);
    }
    let { length } = result;
    if (length < min) {
      throw new Error('?');
    }
    if (length > max) {
      result = result.slice(0, max);
      length = max;
    }
    this.result += result;
    this.counter += length;
  }

  /**
   * Check if the given symbol is a quantifier or metacharacter
   * @param {string} symbol 
   * @return {boolean}
   */
  #isSpecialSymbol(symbol) {
    if (
      this.metaCharacters.has(symbol) ||
      this.metaCharacters.started ||
      this.groups.has(symbol) ||
      this.groups.started ||
      this.quantifiers.has(symbol) ||
      this.quantifiers.started
    ) {
      return true;
    }
  }

  /**
   * Initiate basic variables
   */
   #prepare() {
    this.splitted = {
      input: this.input.split(''),
      expression: this.expression.split(''),
    };
  }
}

// const re = new RegEx('dooooonald', 'd[obvm]{5}nald');
const re = new RegEx('d00000nald', 'd\\d{5}nald');
re.match();
console.log(re.result);