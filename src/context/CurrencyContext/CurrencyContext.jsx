import { createContext, useContext, useState } from "react"
import { currencies } from "./helpers"

const CurrencyContext = createContext()

const CurrencyProvider = ({children}) => {
  const DEFAULT_CURRENCY = currencies.DEFAULT_CURRENCY.getObject()
  const availableCurrencies = currencies.all
  
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY)

  const selectCurrency = (selectedCurrency) => {
    try {
      const exist = availableCurrencies.find(currency => currency.code === selectedCurrency.code)
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