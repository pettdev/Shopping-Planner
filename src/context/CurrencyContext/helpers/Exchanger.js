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
    this.lastActiveCurrency = null // Track which currency was last active
  }

  /**
   * Sets the exchange rate for both the base and quote currencies.
   * 
   * @param {number} rate - The exchange rate to set
   * @returns {void}
   */
  setRate(rate) {
    const validRate = Number(rate) || 1
  
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
    const baseCurrency = this.baseCurrency
    const quoteCurrency = this.quoteCurrency

    if (this.rate > 1 && quoteCurrency.amount > 0) {
      // 1. Calcular el valor en la moneda base
      const rawBase = quoteCurrency.amount * this.rate
      
      // 2. Redondear al centavo más cercano
      const roundedBase = Math.round(rawBase * 100) / 100
      
      // 3. Asignar el valor redondeado
      baseCurrency.setAmount(roundedBase)
      quoteCurrency.setAmount(0)
      
      // 4. Track that base currency is now active
      this.lastActiveCurrency = 'base'
    } else {
      console.log(`No se convirtió a VES. exchange.rate: ${this.rate}, quoteCurrency.amount: ${quoteCurrency.amount}`)
    }
  }
  
  /**
   * Converts the base currency amount to the quote currency amount completely.
   *
   * @returns {void}
   */
  convertBaseToQuote() {
    const baseCurrency = this.baseCurrency
    const quoteCurrency = this.quoteCurrency
    
    if (this.rate > 1 && baseCurrency.amount > 0) {
      // 1. Calcular el valor en USD
      const rawUSD = baseCurrency.amount / this.rate
      
      // 2. Redondear al centavo más cercano
      const roundedUSD = Math.round(rawUSD * 100) / 100
      
      // 3. Asignar el valor redondeado
      quoteCurrency.setAmount(roundedUSD)
      baseCurrency.setAmount(0)
      
      // 4. Track that quote currency is now active
      this.lastActiveCurrency = 'quote'
    } else {
      console.log(`No se convirtió a USD. exchange.rate: ${this.rate}, baseCurrency.amount: ${baseCurrency.amount}`)
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