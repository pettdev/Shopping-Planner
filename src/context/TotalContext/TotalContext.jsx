import { createContext, useContext, useState, useMemo } from "react"
import { useCurrency, useDollarRate } from "../"
import { DecimalInputSanitizer } from "../../utils"
import { exchangeVESforUSD } from "../CurrencyContext/helpers/exchangeVESforUSD"

const TotalContext = createContext()

const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0)
  const validator = new DecimalInputSanitizer()
  const { rate } = useDollarRate()
  const { currency } = useCurrency()

  /**
   * computed converted total:
   * Si la moneda es USD, convierte de VES a USD dividiendo entre la tasa.
   * Caso contrario, deja el total en VES u otra moneda.
   */
  const convertedTotal = useMemo(() => {
    return currency.code === exchangeVESforUSD.quoteCurrency.code ? total / rate : total
  }, [total, currency, rate])

  const updateTotal = (newTotal) => {
    const sanitizedTotal = validator.getSanitizedOf(newTotal)
    const parsedTotal = parseFloat(sanitizedTotal)
    if (!isNaN(parsedTotal)) {
      setTotal(prevTotal => prevTotal + parsedTotal)
    }
  }

  return (
    <TotalContext.Provider value={{ total, updateTotal, setTotal, convertedTotal }}>
      {children}
    </TotalContext.Provider>
  )
}

export const useTotal = () => {
  const context = useContext(TotalContext)
  if (!context) throw new Error('useTotal must be used within a TotalProvider component')
  return context
}

export default TotalProvider
