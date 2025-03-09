import {createContext, useContext, useState, useMemo} from "react"
import {useCurrency, useDollarRate} from "../"
import {DecimalInputSanitizer} from "../../utils"
import {exchangeVESforUSD as exchanger} from "../CurrencyContext/helpers/exchangeVESforUSD"

const TotalContext = createContext()

const TotalProvider = ({children}) => {
  const [total, setTotal] = useState(0)
  const validator = new DecimalInputSanitizer()

  // Custom context hooks
  const {rate} = useDollarRate()
  const {currency} = useCurrency()

  /**
   * Si la moneda es USD, convierte de VES a USD dividiendo entre la tasa.
   * Caso contrario, deja el total en VES u otra moneda.
   */
  const convertedTotal = useMemo(() => {
    return currency.isEqualTo(exchanger.quoteCurrency) ? Math.round((total / rate) * 100) / 100 : total
  }, [total, currency, rate])

  const updateTotal = (newTotal) => {
    const parsedTotal = parseFloat(validator.getSanitizedOf(newTotal))
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