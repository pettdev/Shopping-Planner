import { useEffect, useState } from "react"
import { useBudget, useCurrency } from "../../../../context"
import { DecimalInputSanitizer } from "../../../../utils"
import { Button, Input, ToggleSwitch } from "../../../common"
import { BudgetVisualizer } from './BudgetVisualizer'


const Budget = () => {
  const [budgetListener, setBudgetListener] = useState('')
  const [apply, setApply] = useState(false)
  const [isOn, setIsOn] = useState(false)
  const [showBudgetInputs, setShowBudgetInputs] = useState(true)

  // Custom context hooks
  const {budget, updateBudget} = useBudget()
  const {currency} = useCurrency()

  const toggleStateOnChange = (value) => {
    setIsOn(value)
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
      updateBudget(budgetListener)
      resetAllStates()
      showBudgetInputsSwitch()
    }
  }

  const cancelHandler = () => {
    // Si no hay un presupuesto válido, apagamos el toggle
    if (!budget || budget === '') {
      setIsOn(false)
    }
    resetAllStates()
    setShowBudgetInputs(false)
  }

  // Si el usuario apaga el toggle, reseteamos el presupuesto
  useEffect(() => {
    if(!isOn) {
      resetAllStates()
      updateBudget(null)
    }
  }, [isOn])

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
        checked={isOn}/>

        {((isOn && !showBudgetInputs) && (budget > 0)) && (
          <Button text='Editar' onClick={showBudgetInputsSwitch}/>
        )}
      </div>

      {(isOn && showBudgetInputs) && (
        <form onSubmit={onSubmitHandler}>
          <Input
            placeholder={`1000 ${currency.symbol}`}
            value={budgetListener}
            onChange={e => budgetOnChange(e)}/>
          <Button text={'Aplicar'} type="submit"/>
          <Button text="Cancelar" onClick={cancelHandler} type="button"/>
        </form>
      )}
      {isOn && budget > 0 && (
        <BudgetVisualizer budget={budget}/>)}
    </>
  )
}

export default Budget