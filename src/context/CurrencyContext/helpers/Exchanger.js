/**
 * Represents an exchange rate between two currencies.
 * 
 * @class
 * @classdesc Handles currency exchange rates and operations between a base and quote currency
 */
class Exchanger {
  /**
   * Creates an Exchanger instance.
   *  
   * @param {BaseCurrency} baseCurrency - The base currency (currency being sold)
   * @param {QuoteCurrency} quoteCurrency - The quote currency (currency being bought)
   * @property {number} rate - The exchange rate between the currencies, defaults to 1
   */
  constructor(baseCurrency, quoteCurrency) {
    this.baseCurrency = baseCurrency
    this.quoteCurrency = quoteCurrency
    this.rate = 1
  }

  /**
   * Sets the exchange rate for both the base and quote currencies.
   * 
   * @param {number} rate - The exchange rate to set
   * @returns {void}
   */
  setRate(rate) {
    const validRate = rate || 1
  
    // Verificar si baseCurrency y quoteCurrency están definidos antes de asignar
    if (!this.baseCurrency || !this.quoteCurrency) {
      console.error("Error: baseCurrency o quoteCurrency no están definidos.")
      return
    }
  
    this.rate = validRate
    this.baseCurrency.rate = validRate
    this.quoteCurrency.rate = validRate
  }
  

  /**
   * Returns the currency pair.
   * 
   * @returns {[BaseCurrency, QuoteCurrency]} The base and quote currencies as an array
   */
  getPair() {
    return [this.baseCurrency, this.quoteCurrency]
  }

  /**
   * Converts the quote currency amount to the base currency amount completely.
   *
   * @returns {void}
   */
  convertQuoteToBase() {
    console.log('this.rate: ', this.rate)
    if (this.rate > 1) {
      console.log('pasó por this.convertBaseToQuote()')
      this.baseCurrency.setAmount(this.quoteCurrency.amount * this.this.rate)
      this.quoteCurrency.setAmount(0)
    }
  }

  /**
   * Converts the base currency amount to the quote currency amount completely.
   *
   * @returns {void}
   */
  convertBaseToQuote() {
    console.log('this.rate: ', this.rate)
    if (this.rate > 1) {
      console.log('pasó por this.convertBaseToQuote()')
      this.quoteCurrency.setAmount(this.baseCurrency.amount / this.rate)
      this.baseCurrency.setAmount(0)
    }
  }

  /**
   * Logs the currency pair to the console in format "Pair BASE/QUOTE".
   * 
   * @returns {void}
   * @example
   * const exchanger = new Exchanger(VES, USD)
   * exchanger.consoleInfo() // Logs: "Pair VES/USD"
   */
  consoleInfo() {
    console.log(`Pair ${this.baseCurrency.code}/${this.quoteCurrency.code}`)
  }
}

export default Exchanger