import './budgetVisualizer.css'
import { useDollarRate } from '../../../../../context';
import { exchanger } from '../../../../../context/CurrencyContext/helpers/exchangeVESforUSD';
import { useEffect } from 'react';


export const BudgetVisualizer = ({ budgetLimit, totalSpent, currency }) => {
  const { rate } = useDollarRate()

  // El exchanger envía el rate a ambas monedas
  exchanger.setRate(rate)

  const isDefaultCurrency = exchanger.baseCurrency.isEqualTo(currency)
  const defaultCurrency = exchanger.baseCurrency
  const quoteCurrency = exchanger.quoteCurrency

  // Variables temporales
  let currentCurrency

  // Manejar cambios de moneda
  if (isDefaultCurrency) {
    defaultCurrency.setAmount(budgetLimit)
    currentCurrency = defaultCurrency

  } else {
    quoteCurrency.setAmount(budgetLimit)
    currentCurrency = quoteCurrency
  }

  let convertedTotal
  let convertedBudget

  console.log(currentCurrency.code)

  // POR AQUI QUEDE SEGURAMENTE NO RECORDARAS
  if(defaultCurrency.type='base'){
    convertedTotal = currentCurrency.convertAmount(totalSpent)
    convertedBudget = currentCurrency.getConversion()
  }

  console.log('currentCurrency.rate:', currentCurrency.rate)
  console.log('currentCurrency.amount:', currentCurrency.amount)

  useEffect(()=>{
    console.log('rate:', rate)
    console.log('convertedTotal:', convertedTotal, 'typeof:', typeof convertedTotal)
    console.log('convertedBudget:', convertedBudget, 'typeof:', typeof convertedBudget)

  },[convertedTotal, convertedBudget, rate])

  const spendingPercentage = convertedBudget > 0 ? Math.min((convertedTotal / convertedBudget) * 100, 100).toFixed(2) : (0).toFixed(2);
  const available = parseFloat(convertedBudget > 0 ? (convertedBudget - convertedTotal).toFixed(2) : "0.00")

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
        <div style={spendingsStyle} />
      </div>
      <span>{`${spendingPercentage}% - ${colorStatus.text}`}</span>
      <span style={{ color: available < 0 && '#f4564e' }}>
        {Math.abs(available)} {currency.symbol} - {availableText}
      </span>
    </div>
  );
};
