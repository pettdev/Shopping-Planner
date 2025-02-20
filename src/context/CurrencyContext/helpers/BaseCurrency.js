import Currency from "./Currency";

class BaseCurrency extends Currency {
  constructor(currency) {
    super(currency.name, currency.code, currency.symbol)
    this.type = 'base'
  }
  /**
   * Sets the exchange rate for the base currency.
   * 
   * @param {number} rate - The exchange rate.
   */
  setRate(rate) {
    this.rate = rate;
  }
  /**
   * Set the amount of the currency.
   * @param {number} quantity - The quantity of the currency.
   */
  setAmount(quantity) {
    this.amount = quantity
  }
    
  /**
   * Converts the amount of the base currency to the quote currency.
   * 
   * @returns {number} The converted amount in the quote currency.
   */
  getConversion() {
    return this.rate ? 
           this.amount / this.rate : 
           this.amount
  }


  /**
   * Converts a given amount of the quote currency to the base currency.
   * 
   * @param {number} amount - The amount to convert.
   * @returns {number} The converted amount in the base currency.
   */
  convertAmount(quoteAmount) {
    return this.rate ? 
           quoteAmount * this.rate : 
           quoteAmount
  }
}

export default BaseCurrency