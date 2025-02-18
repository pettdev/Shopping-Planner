import { createContext, useContext, useState } from "react";
import DecimalInputSanitizer from '../../utils/DecimalInputSanitizer'; // Asegúrate de la ruta correcta

const BudgetContext = createContext();

const BudgetContextProvider = ({ children }) => {
  const [budget, setBudget] = useState(''); // Inicializa como cadena vacía
  const validator = new DecimalInputSanitizer();  
  
  const updateBudget = (newBudget) => {
    const sanitizedBudget = validator.getSanitizedOf(newBudget)
    
    console.log('BudgetContext, sanitizedBudget typeof:', typeof sanitizedBudget)
    console.log('BudgetContext, sanitizedBudget', sanitizedBudget)

    const parsedValue = parseFloat(sanitizedBudget)
    setBudget(parsedValue);
  };

  return (
    <BudgetContext.Provider value={{ budget, updateBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) throw new Error('Componente debe estar dentro de BudgetContextProvider');
  return context;
};

export default BudgetContextProvider
