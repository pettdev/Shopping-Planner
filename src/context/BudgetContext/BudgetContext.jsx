import { createContext, useContext, useState } from "react";
import StateValidator from '../../utils/StateValidator'; // Asegúrate de la ruta correcta

const BudgetContext = createContext();

export const BudgetContextProvider = ({ children }) => {
  const [budget, setBudget] = useState(''); // Inicializa como cadena vacía

  const updateBudget = (newBudget) => {
    const validator = new StateValidator();
    const sanitized = validator.sanitize(newBudget);
    setBudget(sanitized);
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
