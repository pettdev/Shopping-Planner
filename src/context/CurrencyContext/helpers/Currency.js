/**
 * Class representing a Currency.
 */
class Currency {
  /**
   * Create a Currency.
   * @param {string} name - The name of the currency.
   * @param {string} code - The code of the currency.
   * @param {string} symbol - The symbol of the currency.
   */
  constructor(name, code, symbol) {
    this.name = name
    this.code = code
    this.symbol = symbol
  }

  /**
   * Logs the currency information to the console.
   */
  consoleInfo() {
    console.log(`${this.name} (${this.code}): ${this.symbol}`)
  }

  /**
   * Returns a string representation of the currency information.
   * @returns {string} The currency information as a string.
   */
  displayInfo() {
    return `${this.name} (${this.code}): ${this.symbol}`;
  }

  /**
   * Get the currency object.
   * @returns {Object} The currency object.
   */
  getObject() {
    return {name: this.name, code: this.code, symbol: this.symbol}
  }

  /**
   * Check if the currency is equal to another currency.
   * @param {Currency} currency - The currency to compare.
   * @returns {boolean} True if the currencies are equal, false otherwise.
   */
  isEqualTo(currency) {
    return this.name === currency.name && 
           this.code === currency.code &&
           this.symbol === currency.symbol;
  }
}

export default Currency