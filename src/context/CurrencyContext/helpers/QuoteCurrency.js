import Currency from "./Currency";

/**
 * Represents a quote currency that extends the base Currency class.
 * Used for currency conversion and exchange rate calculations.
 * @extends Currency
 */
class QuoteCurrency extends Currency {
  /**
   * Creates a new QuoteCurrency instance.
   * @param {Object} currency - The currency object containing name, code and symbol.
   * @param {string} currency.name - The name of the currency.
   * @param {string} currency.code - The currency code.
   * @param {string} currency.symbol - The currency symbol.
   */
  constructor(currency) {
    super(currency.name, currency.code, currency.symbol)
    this.type = 'quote'
    this.amount = 0
  }

  /**
   * Sets the exchange rate for the quote currency.
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
   * Converts the internal amount of the quote currency to the base currency.
   * @returns {number} The converted internal amount in the base currency.
   */
  getConversion() {
    return this.amount * this.rate 
  }
  
  /**
   * Converts a specific amount of the quote currency to the base currency.
   * @returns {number} The converted amount in the base currency.
   */
  convertToCounterCurrency(quoteAmount) {
    return quoteAmount * this.rate 
  }
  
  /**
   * Converts a specific amount of the base currency to the quote currency.
   * @returns {number} The converted amount in the quote currency.
   */
  convertToOwnCurrency(baseAmount) {
    return baseAmount / this.rate
  }

  /**
   * Displays information about the quote currency.
   * @returns {string} A formatted string containing currency details.
   */
  displayInfo() {
    return `
    Currency: ${this.name} (${this.code})
    Symbol: ${this.symbol}
    Type: Quote Currency
    Current Rate: ${this.rate || 'Not set'}
    Current Amount: ${this.amount || 'Not set'}`
  }

  /**
   * Checks if the currency is a quote currency.
   * @returns {boolean} Always returns true for QuoteCurrency instances.
   */
  isQuoteCurrency() {
    return true
  }

  /**
   * Checks if the currency is a base currency.
   * @returns {boolean} Always returns false for QuoteCurrency instances.
   */
  isBaseCurrency() {
    return false
  }
}

export default QuoteCurrency