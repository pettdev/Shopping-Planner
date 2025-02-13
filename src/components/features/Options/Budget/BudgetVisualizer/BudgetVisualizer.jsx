import './budgetVisualizer.css';
import StateValidator from '../../../../../utils/StateValidator';

export const BudgetVisualizer = ({ budget, totalSpent }) => {
  const validator = new StateValidator();
  
  console.log('Desde BudgetVisualizer.jsx, budget:', budget);
  
  // Parse y validación de valores
  const parsedSpent = parseFloat(totalSpent);
  const parsedBudget = parseFloat(budget);
  
  // Si el valor es NaN (por ejemplo, input vacío), lo tratamos como 0
  const sanitizedSpent = isNaN(parsedSpent) ? 0 : validator.sanitize(parsedSpent);
  const sanitizedBudget = isNaN(parsedBudget) ? 0 : validator.sanitize(parsedBudget);
  
  // Evitamos la división por cero
  const fractionSpent = sanitizedBudget > 0 ? Math.min((sanitizedSpent / sanitizedBudget) * 100, 100) : 0;
  const formattedFraction = fractionSpent.toFixed(2);
  const available = sanitizedBudget > 0 ? (sanitizedBudget - sanitizedSpent).toFixed(2) : "0.00";

  // Función para determinar el color y el texto de estado basado en el porcentaje gastado
  const getColorStatus = (fraction) => {
    const f = parseFloat(fraction);
    if (f <= 10) return { divColor: '#5ef05c', statusText: 'Óptimo' };
    if (f <= 20) return { divColor: '#9ef05c', statusText: 'Muy favorable' };
    if (f <= 30) return { divColor: '#c1f05c', statusText: 'Favorable' };
    if (f <= 40) return { divColor: '#dff05c', statusText: 'Bajo control' };
    if (f <= 50) return { divColor: '#f0e35c', statusText: 'Estable' };
    if (f <= 60) return { divColor: '#f0c85c', statusText: 'Aceptable' };
    if (f <= 70) return { divColor: '#f0b25c', statusText: 'Moderado' };
    if (f <= 80) return { divColor: '#f0795c', statusText: 'Riesgo moderado' };
    if (f <= 90) return { divColor: '#e15750', statusText: 'Riesgo elevado' };
    if (f < 100) return { divColor: '#e15750', statusText: 'Crítico' };
    return { divColor: '#f4564e', statusText: 'Límite alcanzado' };
  };

  const colorStatus = getColorStatus(formattedFraction);
  const availableStatusText = parseFloat(available) >= 0 ? 'Restante' : 'Exceso';

  // Estilos
  const budgetStyle = {
    backgroundColor: '#dddddd',
    maxWidth: '300px',
    height: '8px',
    margin: '5px 0',
    borderRadius: '4px',
  };

  const spendingsStyle = {
    backgroundColor: colorStatus.divColor,
    maxWidth: `${formattedFraction}%`,
    height: '100%',
    borderRadius: '4px',
    transition: 'max-width 0.4s ease-out, background-color 0.3s ease-out',
  };

  return (
    <div className="budget-visualizer">
      <div style={budgetStyle}>
        <div style={spendingsStyle} />
      </div>
      <span>{`${formattedFraction}% - ${colorStatus.statusText}`}</span>
      <span style={{ color: parseFloat(available) < 0 ? '#f4564e' : '#444444' }}>
        {Math.abs(available)} - {availableStatusText}
      </span>
    </div>
  );
};
