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
    try {
      for (let i = 0; i < splitted.expression.length; i++) {
        const expressionToken = splitted.expression[i];
  
        if (this.#isSpecialSymbol(expressionToken)) {
          this.patternStarted = true;
        }
        else {
          if (this.patternStarted) {
            try {
              this.#processPattern();
            } catch {
              throw 0;
            }
          }
          const inputToken = this.input[this.counter];
          if (inputToken !== expressionToken) {
            throw 0;
          }
          this.result += expressionToken;
          this.counter++;
        }
      }
    } catch {
      this.result = null;
    }
  }

  /**
   * Process the assembled pattern
   */
  #processPattern() {
    this.patternStarted = false;
    let result = '';
    
    const subInput = this.input.slice(this.counter);
    const [min, max] = this.quantifiers.getRange();
    const match = this.#getMatch();

    for (let i = 0; i < subInput.length; i++) {
      if (i == max) {
        break;
      }
      const char = subInput.slice(i, i+1);
      if (match(char)) {
        result += char;
      } else {
        break;
      }
    }
    if (result.length < min) {
      throw 0;
    }
    this.result += result;
    this.counter += result.length;
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

  /**
   * Get method match of the appropriate class
   * @return {Function}
   */
  #getMatch() {
    if (this.metaCharacters.pattern.length > 0) {
      return this.metaCharacters.match.bind(this.metaCharacters);
    } else {
      return this.groups.match.bind(this.groups);
    }
  }
}
