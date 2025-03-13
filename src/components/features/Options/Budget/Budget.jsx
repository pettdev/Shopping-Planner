import { useEffect, useState } from "react"
import { useBudget, useCurrency } from "../../../../context"
import { DecimalInputSanitizer } from "../../../../utils"
import { Button, Input, ToggleSwitch } from "../../../common"
import { BudgetVisualizer } from './BudgetVisualizer'
import { exchangeVESforUSD as exchange } from "../../../../context/CurrencyContext/helpers/exchangeVESforUSD"


const Budget = () => {
  const [budgetListener, setBudgetListener] = useState('')
  const [apply, setApply] = useState(false)
  const [isToggleON, setIsToggleON] = useState(false)
  const [showBudgetInputs, setShowBudgetInputs] = useState(true)

  // Custom context hooks
  const {budget, updateBudget} = useBudget()
  const {currency} = useCurrency()

  // Obtener las monedas
  const [bolivar, dollar] = exchange.getPair()

  const toggleStateOnChange = (value) => {
    setIsToggleON(value)
  }

  const showBudgetInputsSwitch = () => setShowBudgetInputs(prev => !prev)

  const validator = new DecimalInputSanitizer()

  const budgetOnChange = (e) => {
    const budget = e.target.value
    const sanitizedBudget = validator.getSanitizedOf(budget)
    setBudgetListener(sanitizedBudget)
  }

  const resetAllStates = () => {
    setBudgetListener('')
    setShowBudgetInputs(true)
    setApply(false)
  }

  const budgetHandler = () => {
    if(apply && budgetListener >= 0.01 ) {
      if (currency.isEqualTo(bolivar)) {
        bolivar.setAmount(budgetListener)
      }
      if (currency.isEqualTo(dollar)) {
        dollar.setAmount(budgetListener)
      }
      updateBudget(budgetListener) // Revisar si es necesario
      resetAllStates()
      showBudgetInputsSwitch()
    }
  }

  const cancelHandler = () => {
    // Si no hay un presupuesto válido, apagamos el toggle
    if (!budget || budget === '') {
      setIsToggleON(false)
    }
    resetAllStates()
    setShowBudgetInputs(false)
  }

  // Si el usuario apaga el toggle, reseteamos el presupuesto
  useEffect(() => {
    if(!isToggleON) {
      resetAllStates()
      updateBudget(null) // Revisar si es necesario
    }
  }, [isToggleON])

  useEffect(() => {
    if(apply) {
      budgetHandler()
      setApply(false)
    }
  }, [apply])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setApply(true)
  }
  
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center'}}>
      <ToggleSwitch 
        label={'Usar presupuesto'}
        onChange={toggleStateOnChange}
        checked={isToggleON}/>

        {((isToggleON && !showBudgetInputs) && (budget > 0)) && (
          <Button text='Editar' onClick={showBudgetInputsSwitch}/>
        )}
      </div>

      {(isToggleON && showBudgetInputs) && (
        <form onSubmit={onSubmitHandler}>
          <Input
            placeholder={`1000 ${currency.symbol}`}
            value={budgetListener}
            onChange={e => budgetOnChange(e)}/>
          <Button text={'Aplicar'} type="submit"/>
          <Button text="Cancelar" onClick={cancelHandler} type="button"/>
        </form>
      )}
      {isToggleON && budget > 0 && (
        <BudgetVisualizer budget={budget}/>)}
    </>
  )
}

export default Budget