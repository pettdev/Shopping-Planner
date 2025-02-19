import { createContext, useContext, useState } from "react"
import { currencies } from "../../data"

const CurrencyContext = createContext()

const CurrencyProvider = ({children}) => {
  const DEFAULT_CURRENCY_CODE = 'VES'
  const defaultCurrency = currencies.currencies.find(currency => currency.code === DEFAULT_CURRENCY_CODE)
  const availableCurrencies = currencies.currencies.map(currency=> currency)
  
  const [currency, setCurrency] = useState(defaultCurrency)

  const selectCurrency = (selectedCurrency) => {
    try {
      const exist = availableCurrencies.find(currency => currency.name === selectedCurrency.name)
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