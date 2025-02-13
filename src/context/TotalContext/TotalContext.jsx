import { createContext, useContext, useState } from "react";

const TotalContext = createContext()

export const TotalProvider = ({children}) => {
  const [total, setTotal] = useState(0)

  const updateTotal = (newTotal) => {
    const parsedValue = parseFloat(newTotal);
    // Verificar si el valor es un número válido
    if (!isNaN(parsedValue)) {
      setTotal(prevTotal => prevTotal + parsedValue);
    }
  };

  return (
    <TotalContext.Provider value={{total, updateTotal}}>
      {children}
    </TotalContext.Provider>
  )
}

export const useTotal = () => {
  const context = useContext(TotalContext)
  if(!context) throw new Error('useTotal must be used within a TotalProvider component')
  return context
}