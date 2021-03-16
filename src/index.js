'use strict';

const MetaCharacters = require('./metacharacters');
const Quantifiers = require('./quantifiers');

class RegEx {
  metaCharacters = new MetaCharacters();
  quantifiers = new Quantifiers();

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
        this.pattern += token;
        this.searchStarted = true;
      }
      else {
        if (this.searchStarted) {
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
    const { pattern } = this;
    this.searchStarted = false;
    let metaCharacter = this.metaCharacters.extract(pattern);
    let quantifier = this.quantifiers.extract(pattern);

    const subInput = this.input.slice(this.counter);
    const matchSymbol = this.metaCharacters[metaCharacter](subInput);
    const foundString = this.quantifiers[quantifier](matchSymbol, subInput);

    this.result += foundString;
    this.counter += foundString.length;
  }

  /**
   * Initiate basic variables
   */
  #prepare() {
    this.splitted = {
      input: this.input.split(''),
      expression: this.expression.split(''),
    };
    this.counter = 0;
    this.result = '';
    this.searchStarted = false;
    this.pattern = '';
  }

  /**
   * Whether the given symbol is a quantifier or a metacharacter
   * @param {string} symbol 
   * @return {boolean}
   */
  #isSpecialSymbol(symbol) {
    return this.metaCharacters.exists(symbol) || this.quantifiers.exists(symbol);
  }
}

const re = new RegEx('dooooonald', 'd.+nald');
re.match();
console.log(re.result);