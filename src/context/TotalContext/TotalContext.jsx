import { createContext, useContext, useState } from "react"
import { DecimalInputSanitizer } from "../../utils"

const TotalContext = createContext()

const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0)
  const validator = new DecimalInputSanitizer()

  const updateTotal = (newTotal) => {
    const sanitizedTotal = validator.getSanitizedOf(newTotal) // Validar
    const parsedTotal = parseFloat(sanitizedTotal) // String a Number

    if (!isNaN(parsedTotal)) {
      setTotal(prevTotal => prevTotal + parsedTotal)
    }
  }

  return (
    <TotalContext.Provider value={{ total, updateTotal }}>
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