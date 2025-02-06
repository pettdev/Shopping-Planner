import { createContext, useContext, useState } from "react";

const BudgetContext = createContext()

export const BudgetContextProvider = ({children}) => {
  const [budget, setBudget] = useState(0)

  const updateBudget = (newBudget) => setBudget(newBudget)

  return (
    <BudgetContext.Provider value={{budget, updateBudget}}>
      {children}
    </BudgetContext.Provider>
  )
}

export const useBudget = () => {
  const context = useContext(BudgetContext)

  if(!context) throw new Error('The component that use useBudget function must be placed within a BudgetContextProvider component')
  
  return context
}