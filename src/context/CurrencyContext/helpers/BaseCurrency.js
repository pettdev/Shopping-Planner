import Currency from "./Currency";

/**
 * Represents a base currency that extends the Currency class.
 * This class handles currency conversions and rate management.
 * @extends Currency
 */
class BaseCurrency extends Currency {
  /**
   * Creates a new BaseCurrency instance.
   * @param {Object} currency - The currency object containing basic currency information.
   * @param {string} currency.name - The name of the currency.
   * @param {string} currency.code - The currency code (e.g., USD, EUR).
   * @param {string} currency.symbol - The currency symbol (e.g., $, €).
   */
  constructor(currency) {
    super(currency.name, currency.code, currency.symbol)
    this.type = 'base'
    this.amount = 0
  }
  
  /**
   * Sets the exchange rate for the base currency.
   * @param {number} rate - The exchange rate.
   * @returns {void}
   */
  setRate(rate) {
    this.rate = rate;
  }

  /**
   * Set the amount of the currency.
   * @param {number} quantity - The quantity of the currency.
   * @returns {void}
   */
  setAmount(quantity) {
    this.amount = quantity
  }
    
  /**
   * Converts the internal amount of the base currency to the quote currency.
   * @returns {number} The converted internal amount in the quote currency.
   */
  getConversion() {
    return this.amount / this.rate 
  }

  /**
   * Converts a specific amount of the base currency to the quote currency.
   * @returns {number} The converted amount in the quote currency.
   */ 
  convertToCounterCurrency(baseAmount) {
    return baseAmount / this.rate 
  }

  /**
   * Converts a specific amount of the quote currency to the base currency.
   * @returns {number} The converted amount in the base currency.
   */
  convertToOwnCurrency(quoteAmount) {
    return quoteAmount * this.rate
  }

  /**
   * Displays information about the base currency.
   * @returns {string} A formatted string containing currency details.
   */
  displayInfo() {
    return `
    Currency: ${this.name} (${this.code})
    Symbol: ${this.symbol}
    Type: Base Currency
    Current Rate: ${this.rate || 'Not set'}
    Current Amount: ${this.amount || 'Not set'}`
  }

  /**
   * Checks if the currency is a quote currency.
   * @returns {boolean} Always returns false for BaseCurrency instances.
   */
  isQuoteCurrency() {
    return false
  }

  /**
   * Checks if the currency is a base currency.
   * @returns {boolean} Always returns true for BaseCurrency instances.
   */
  isBaseCurrency() {
    return true
  }
}

export default BaseCurrency