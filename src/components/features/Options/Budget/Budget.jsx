import { ToggleSwitch } from "../../../common/ToggleSwitch"
import { Button, Input } from "../../../common"
import { BudgetVisualizer } from './BudgetVisualizer'
import { useBudget } from "../../../../context"
import { useEffect, useState } from "react"
import { useTotal } from "../../../../context/TotalContext"

const Budget = () => {
  const { budget, updateBudget } = useBudget()
  const { total } = useTotal()
  const [budgetListener, setBudgetListener] = useState('')
  const [apply, setApply] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [showBudgetInputs, setShowBudgetInputs] = useState(true)

  const checkedOnChange = (value) => {
    setIsChecked(value)
  }

  const applySwitch = () => setApply(prev => !prev)

  const showBudgetInputsSwitch = () => setShowBudgetInputs(prev => !prev)

  const budgetOnChange = (rawBudget) => {
    setBudgetListener(rawBudget)
  }

  const resetAllStates = () => {
    setBudgetListener('')
    setShowBudgetInputs(true)
    setApply(false)
  }

  const budgetHandler = () => {
    if(apply && budgetListener > 0.01) {
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
        checked={isChecked}
      />

        
        {(isChecked && !showBudgetInputs) && budget > 0 && (
          <Button text='Editar' onClick={showBudgetInputsSwitch}/>
        )}
      </div>

      {isChecked && showBudgetInputs && (
        <form onSubmit={onSubmitHandler}>
          <Input
            placeholder={'Ingresar presupuesto'}
            value={budgetListener}
            onChange={e => budgetOnChange(e.target.value)}/>
          <Button text={'Aplicar'} type="submit"/>
          <Button text="Cancelar" onClick={cancelHandler} type="button"/>
        </form>
      )}

      {isChecked && budget > 0 && <BudgetVisualizer budget={budget} totalSpent={total}/>}
    </>
  )
}

export default Budget