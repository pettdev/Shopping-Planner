import { createContext, useContext, useState } from "react"
import { exchangeVESforUSD as exchangeVESforUSD } from "./helpers/exchangeVESforUSD"
import {currencies} from "./helpers"

const CurrencyContext = createContext()

const CurrencyProvider = ({children}) => {
  const DEFAULT_CURRENCY = exchangeVESforUSD.baseCurrency
  const availableCurrencies = currencies.all
  
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY)

  const selectCurrency = (selectedCurrency) => {
    try {
      // Comprobamos que la moneda seleccionada existe
      const exist = availableCurrencies.find(currency => currency.code === selectedCurrency.code)
      // Si existe, la seleccionamos
      exist && setCurrency(selectedCurrency)
    } catch (error) {
      console.error('Ha ocurrido un error con la moneda seleccionada:', error)
    }
  }

  return (
    <CurrencyContext.Provider value={{currency, selectCurrency}}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if(!context) throw new Error('useCurrency must be used enclosed by the CurrencyProvider')
  return context
}

export default CurrencyProvider