import './budgetVisualizer.css'
import { useTotal, useDollarRate, useCurrency } from '../../../../../context'
import { useEffect, useState } from 'react'
import { exchangeVESforUSD as exchanger } from '../../../../../context/CurrencyContext/helpers/exchangeVESforUSD'

export const BudgetVisualizer = ({ budget }) => {
  const {rate} = useDollarRate()
  const {convertedTotal} = useTotal()
  const {currency} = useCurrency()
  const [convertedBudget, setConvertedBudget] = useState(0)
  const [bolivar, dollar] = exchanger.getPair()

  /* WHAT HAPPENS HERE?

  1. By default, Bolivar (VES) is selected as current currency (in Budget.jsx's 
  budgetHandler) after an amount is entered in the Budget.jsx's Input component
  by using bolivar.setAmount().

  2. Setting an amount of a currency will trigger this useEffect, as 'currency'
  is one if its dependencies. This means that the logic involved here will be
  invoked accordingly.

  3. 
  */
  useEffect(() => {
    let newBudget = 0
    
    // If we're using the base currency (VES)
    if (currency.isBaseCurrency()) {
      newBudget = currency.amount.toFixed(2)
    } 
    // If we're using the quote currency (USD)
    else if (currency.isQuoteCurrency()) {
      newBudget = currency.amount.toFixed(2)
    }

    setConvertedBudget(newBudget)
  
  }, [currency, rate, budget, dollar, exchanger.rate])

  let spendingPercentage
  if (convertedBudget > 0) {
    console.log('convertedBudget =', convertedBudget, 'currency =', currency.code, 'currency.amount =', currency.amount ,'exchanger.rate =', exchanger.rate, 'currency.type =', currency.type)

    spendingPercentage = Math.min((convertedTotal / convertedBudget) * 100, 100)
  } else {
    spendingPercentage = 0.00
  }

  const available = Math.abs(Number(convertedBudget - convertedTotal)).toFixed(2)
  const colorStatus = getColorStatus(spendingPercentage)
  const availableText = available >= 0 ? 'Restante' : 'Faltante'

  return (
    <div className="budget-visualizer">
      <div className="budget-bar-container">
        <div 
          className="spendings-progress"
          style={{ 
            maxWidth: `${spendingPercentage}%`,
            backgroundColor: colorStatus.divColor
          }}
        />
      </div>

      <div className="info-container">
        <span className="bold-text">
          {convertedBudget} {currency.code}
        </span>
        <span>{`${spendingPercentage}%`}</span>
        <span className={available < 0 ? 'exceeded-text' : ''}>
          {available} {currency.code} {availableText}
        </span>
      </div>
    </div>
  )
}

const getColorStatus = (percentage) => {
  const p = parseFloat(percentage).toFixed(2)
  
  if (p <= 10) return { divColor: '#5ef05c', text: 'Óptimo' }
  if (p <= 20) return { divColor: '#9ef05c', text: 'Muy favorable' }
  if (p <= 30) return { divColor: '#c1f05c', text: 'Favorable' }
  if (p <= 40) return { divColor: '#dff05c', text: 'Bajo control' }
  if (p <= 50) return { divColor: '#f0e35c', text: 'Estable' }
  if (p <= 60) return { divColor: '#f0c85c', text: 'Aceptable' }
  if (p <= 70) return { divColor: '#f0b25c', text: 'Moderado' }
  if (p <= 80) return { divColor: '#f0795c', text: 'Riesgo moderado' }
  if (p <= 90) return { divColor: '#e15750', text: 'Riesgo elevado' }
  if (p < 100) return { divColor: '#e15750', text: 'Crítico' }

  return { divColor: '#f4564e', text: 'Límite alcanzado' }
}