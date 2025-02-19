import { useDollarRate } from '../../../../../context';
import './budgetVisualizer.css'

export const BudgetVisualizer = ({budgetLimit, totalSpent, currency}) => {
  const {rate} = useDollarRate()
  const total = totalSpent / (rate || 1)
  const budget = budgetLimit / (rate || 1)

  const spendingPercentage = budget > 0 ? Math.min((total / budget) * 100, 100).toFixed(2) : (0).toFixed(2);
  const available = parseFloat(budget > 0 ? (budget - total).toFixed(2) : "0.00")

  // Función para determinar el color y el texto de estado basado en el porcentaje gastado
  const getColorStatus = (percentage) => {
    const p = parseFloat(percentage)

    if (p <= 10) return { divColor: '#5ef05c', text: 'Óptimo' };
    if (p <= 20) return { divColor: '#9ef05c', text: 'Muy favorable' };
    if (p <= 30) return { divColor: '#c1f05c', text: 'Favorable' };
    if (p <= 40) return { divColor: '#dff05c', text: 'Bajo control' };
    if (p <= 50) return { divColor: '#f0e35c', text: 'Estable' };
    if (p <= 60) return { divColor: '#f0c85c', text: 'Aceptable' };
    if (p <= 70) return { divColor: '#f0b25c', text: 'Moderado' };
    if (p <= 80) return { divColor: '#f0795c', text: 'Riesgo moderado' };
    if (p <= 90) return { divColor: '#e15750', text: 'Riesgo elevado' };
    if (p < 100) return { divColor: '#e15750', text: 'Crítico' };

    return {
      divColor: '#f4564e',
      text: 'Límite alcanzado'
    }
  }

  const colorStatus = getColorStatus(spendingPercentage);
  const availableText = available >= 0 ? 'Restante' : 'Excedido';

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
    maxWidth: `${spendingPercentage}%`,
    height: '100%',
    borderRadius: '4px',
    transition: 'max-width 0.4s ease-out, background-color 0.3s ease-out',
  };

  return (
    <div className="budget-visualizer">
      <div style={budgetStyle}>
        <div style={spendingsStyle}/>
      </div>
      <span>{`${spendingPercentage}% - ${colorStatus.text}`}</span>
      <span style={{ color: available < 0 && '#f4564e'}}>
        {Math.abs(available)} {currency.symbol} - {availableText}
      </span>
    </div>
  );
};
