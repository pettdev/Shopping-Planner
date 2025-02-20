/**
 * Represents an exchange rate between two currencies.
 * 
 * @param {BaseCurrency} baseCurrency - The base currency of the exchange rate.
 * @param {QuoteCurrency} quoteCurrency - The quote currency of the exchange rate.
 */
class Exchanger {
  /**
   * Creates an Exchanger instance.
   *  
   * @param {BaseCurrency} baseCurrency - The base currency of the exchange rate.
   * @param {QuoteCurrency} quoteCurrency - The quote currency of the exchange rate.
   */
  constructor(baseCurrency, quoteCurrency) {
    this.baseCurrency = baseCurrency;
    this.quoteCurrency = quoteCurrency;
  }

  /**
   * Sets the exchange rate for both the base and quote currencies.
   * 
   * @param {number} rate - The exchange rate to set.
   */
  setRate(rate) {
    [this, this.baseCurrency, this.quoteCurrency].forEach(instance => instance.rate = rate);
  }

  /**
   * Returns the currency pair.
   * 
   * @returns {[BaseCurrency, QuoteCurrency]} An array containing the base and quote currencies.
   */
  getPair() {
    return [this.baseCurrency, this.quoteCurrency];
  }

  /**
   * Logs the currency pair to the console.
   * 
   * @example
   * Exchanger.consoleInfo(); // Logs 'Pair VES/USD' to the console
   */
  consoleInfo() {
    console.log(`Pair ${this.baseCurrency.code}/${this.quoteCurrency.code}`);
  }
}

export default Exchanger