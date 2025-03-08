/**
 * @fileoverview Currency exchange module for VES to USD conversion
 */

import Exchanger from './Exchanger.js'
import currencies from './currencies.js'
import BaseCurrency from './BaseCurrency.js'
import QuoteCurrency from './QuoteCurrency.js'

/**
 * Base currency instance representing Venezuelan Bolivares (VES)
 * @type {BaseCurrency}
 */
const baseCurrency = new BaseCurrency(currencies.BS)

/**
 * Quote currency instance representing United States Dollars (USD)
 * @type {QuoteCurrency}
 */
const quoteCurrency = new QuoteCurrency(currencies.USD)

/**
 * Exchanger instance configured for VES to USD conversion
 * @type {Exchanger}
 */
export const exchangeVESforUSD = new Exchanger(baseCurrency, quoteCurrency)