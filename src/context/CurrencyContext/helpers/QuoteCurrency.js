import Currency from "./Currency";

class QuoteCurrency extends Currency {
  constructor(currency) {
    super(currency.name, currency.code, currency.symbol)
    this.type = 'quote'
  }
  /**
   * Sets the exchange rate for the quote currency.
   * 
   * @param {number} rate - The exchange rate.
   */
  setRate(rate) {
    this.rate = rate;
  }

  /**
   * 
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
           this.amount * this.rate : 
           this.amount
  }


  /**
   * Converts a given amount of the base currency to the quote currency.
   * 
   * @param {number} baseAmount - The amount to convert from the base currency.
   * @returns {number} The converted amount in the quote currency.
   */
  convertAmount(baseAmount) {
    return this.rate ? 
           baseAmount / this.rate : 
           baseAmount
  }
}

export default QuoteCurrency