import { useEffect, useState } from "react"
import { useBudget, useCurrency, useTotal } from "../../../../context"
import { DecimalInputSanitizer } from "../../../../utils"
import { Button, Input, ToggleSwitch } from "../../../common"
import { BudgetVisualizer } from './BudgetVisualizer'

const Budget = () => {
  
  const [budgetListener, setBudgetListener] = useState('')
  const [apply, setApply] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [showBudgetInputs, setShowBudgetInputs] = useState(true)
  const { budget, updateBudget } = useBudget()
  const { total } = useTotal()
  const { currency } = useCurrency()

  const checkedOnChange = (value) => {
    setIsChecked(value)
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
    // Si no hay un presupuesto válido (caso 1), apagamos el toggle
    if (!budget || budget === '') {
      setIsChecked(false)
    }
    resetAllStates()
    setShowBudgetInputs(false)
  }

  useEffect(() => {
    if(!isChecked) {
      resetAllStates()
      updateBudget(null) // resetear presupuesto en contexto
    }
  }, [isChecked])

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
        onChange={checkedOnChange}
        checked={isChecked}/>

        {(isChecked && !showBudgetInputs) && budget > 0 && (
          <Button text='Editar' onClick={showBudgetInputsSwitch}/>
        )}
      </div>

      {isChecked && showBudgetInputs && (
        <form onSubmit={onSubmitHandler}>
          <Input
            placeholder={`1000 ${currency.symbol}`}
            value={budgetListener}
            onChange={e => budgetOnChange(e)}/>
          <Button text={'Aplicar'} type="submit"/>
          <Button text="Cancelar" onClick={cancelHandler} type="button"/>
        </form>
      )}
      {isChecked && budget > 0 && (
        <BudgetVisualizer budgetLimit={budget} totalSpent={total} currency={currency}/>)}
    </>
  )
}

export default Budget