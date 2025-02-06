import './budgetVisualizer.css'
import { useState, useEffect } from "react"

export const BudgetVisualizer = ({budget, totalSpent}) => {

  // Verificar si budget o totalSpent son undefined
  if (budget === undefined || totalSpent === undefined) {
    console.log(`BudgetVisualizer: budget o totalSpent es undefined`)
    return null;
  }

  const [available, setAvailable] = useState(0.00)
  const [fractionSpent, setFractionSpent] = useState(0.00)
  const [colorStatus, setColorstatus] = useState(0.00)

  // Calcular porcentaje gastado
  const calcFractionSpent = (spent, budget) => {
    const parsedSpent = parseFloat(spent, 10);
    const parsedBudget = parseFloat(budget, 10);
    // Validación
    if (isNaN(parsedSpent) || isNaN(parsedBudget) || parsedBudget === 0) {
      console.error("Los valores proporcionados no son válidos.");
      return;
    }
    // Cálculo
    const totalSum = ((parsedSpent / parsedBudget) * 100).toFixed(2);
    setFractionSpent(Math.min(totalSum, 100));
  };

  // Calcular cantidad disponible para gastar
  const calcAvailable = (spent, budget) => {
    const parsedSpent = parseFloat(spent, 10)
    const parsedBudget = parseFloat(budget, 10)

    if (isNaN(parsedSpent) || isNaN(parsedBudget) || parsedBudget === 0) {
      console.error("Los valores proporcionados no son válidos.");
      return;
    }

    const available = (parsedBudget - parsedSpent).toFixed(2)
    setAvailable(available)
  }
  
  // useEffect para calcular y actualizar el estado del presupuesto y el
  // color basado en los cambios de 'spent', 'total', y 'fractionSpent'
  useEffect(() => {
    console.log(`budget: ${budget}, totalSpent: ${totalSpent}`)
    calcFractionSpent(totalSpent, budget)

    const colors = getColorStatus(fractionSpent);
    setColorstatus(colors);
    
    calcAvailable(totalSpent, budget)
  }, [totalSpent, budget, fractionSpent])

  // Función para obtener el color y texto de estado según el porcentaje gastado
  const getColorStatus = (fraction) => {
    if (fraction <= 10) return { divColor: '#5ef05c', statusText: 'Óptimo' };
    if (fraction <= 20) return { divColor: '#9ef05c', statusText: 'Muy favorable' };
    if (fraction <= 30) return { divColor: '#c1f05c', statusText: 'Favorable' };
    if (fraction <= 40) return { divColor: '#dff05c', statusText: 'Bajo control' };
    if (fraction <= 50) return { divColor: '#f0e35c', statusText: 'Estable' };
    if (fraction <= 60) return { divColor: '#f0c85c', statusText: 'Aceptable' };
    if (fraction <= 70) return { divColor: '#f0b25c', statusText: 'Moderado' };
    if (fraction <= 80) return { divColor: '#f0795c', statusText: 'Riesgo moderado' };
    if (fraction <= 90) return { divColor: '#e15750', statusText: 'Riesgo elevado' };
    if (fraction <= 99.99) return { divColor: '#e15750', statusText: 'Crítico' };
    return { divColor: '#f4564e', statusText: 'Límite alcanzado' };
  }

  // Añadir una función para obtener el texto de estado basado en el monto disponible
  const getAvailableStatusText = (available) => {
    return parseFloat(available) >= 0 ? 'Restante' : 'Exceso';
  };

  // Estilos
  const budgetStyle = {
    backgroundColor: '#dddddd',
    maxWidth: '300px',
    height: '8px',
    margin: '5px 0px',
    borderRadius: '4px',
  }
  const spendingsStyle = {
    backgroundColor: colorStatus.divColor,
    maxWidth: `${fractionSpent}%`,
    height: '100%',
    borderRadius: '4px',
    transition: 'max-width 0.4s ease-out, background-color 0.3s ease-out'
  }

  return (
    <div className="budget-visualizer">
      <div style={budgetStyle}>
        <div style={spendingsStyle}/>
      </div>
      <span>{`${fractionSpent}% - ${colorStatus.statusText}`}</span>
      <span style={{ color: parseFloat(available) < 0 ? '#f4564e' : '#444444' }}>
        {Math.abs(available)} - {getAvailableStatusText(available)}
      </span>
    </div>
  )
}