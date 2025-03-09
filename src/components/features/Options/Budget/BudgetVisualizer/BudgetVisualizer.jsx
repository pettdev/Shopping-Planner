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

  useEffect(() => {
    if (currency.isEqualTo(dollar)) {
      if (dollar.amount > 0) {
        setConvertedBudget(budget)
      } else {
        exchanger.convertBaseToQuote()
        setConvertedBudget(dollar.amount)
      }
    } else {
      bolivar.setAmount(budget)
      setConvertedBudget(bolivar.amount)
    }
  }, [currency, rate, budget])

  let spendingPercentage
  if (convertedBudget > 0) {
    const total = Number(convertedTotal.toFixed(2))
    const budgetAmount = Number(convertedBudget.toFixed(2))
    spendingPercentage = Math.min((total / budgetAmount) * 100, 100).toFixed(2)
  } else {
    spendingPercentage = (0).toFixed(2)
  }

  const available = parseFloat(convertedBudget - convertedTotal).toFixed(2)
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
          {convertedBudget.toFixed(2)} {currency.code}
        </span>
        <span>{`${spendingPercentage}%`}</span>
        <span className={available < 0 ? 'exceeded-text' : ''}>
          {Math.abs(available).toFixed(2)} {currency.code} {availableText}
        </span>
      </div>
    </div>
  )
}

const getColorStatus = (percentage) => {
  const p = parseFloat(percentage)
  
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