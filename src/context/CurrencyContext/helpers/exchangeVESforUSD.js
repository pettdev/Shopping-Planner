import Exchanger from './Exchanger.js'
import currencies from './currencies.js'
import BaseCurrency from './BaseCurrency.js'
import QuoteCurrency from './QuoteCurrency.js'

const baseCurrency = new BaseCurrency(currencies.BS)
const quoteCurrency = new QuoteCurrency(currencies.USD)

export const exchanger = new Exchanger(baseCurrency, quoteCurrency)

