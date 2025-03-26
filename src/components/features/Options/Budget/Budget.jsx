import { useEffect, useState } from "react"
import { useBudget, useCurrency } from "../../../../context"
import { DecimalInputSanitizer } from "../../../../utils"
import { Button, Input } from "../../../common"
import { BudgetVisualizer } from './BudgetVisualizer'
import { exchangeVESforUSD as exchange } from "../../../../context/CurrencyContext/helpers/exchangeVESforUSD"


const Budget = () => {
  const [budgetListener, setBudgetListener] = useState('')
  const [apply, setApply] = useState(false)
  const [useBudgetActive, setUseBudgetActive] = useState(false)
  const [showBudgetInputs, setShowBudgetInputs] = useState(false)

  // Custom context hooks
  const {budget, updateBudget} = useBudget()
  const {currency} = useCurrency()

  // Obtener las monedas
  const [bolivar, dollar] = exchange.getPair()

  const toggleBudgetActive = () => {
    setUseBudgetActive(prev => !prev)
    if (!useBudgetActive) {
      setShowBudgetInputs(true)
    }
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
    // Si no hay un presupuesto válido, desactivamos el presupuesto
    if (!budget || budget === '') {
      setUseBudgetActive(false)
    }
    resetAllStates()
    setShowBudgetInputs(false)
  }

  // Si el usuario desactiva el presupuesto, lo reseteamos
  useEffect(() => {
    if(!useBudgetActive) {
      resetAllStates()
      updateBudget(null) // Revisar si es necesario
    }
  }, [useBudgetActive])

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
        <Button 
          text={useBudgetActive ? 'Presupuesto activo' : 'Activar presupuesto'} 
          onClick={toggleBudgetActive}
          style={{ marginRight: '10px', backgroundColor: useBudgetActive ? '#84e1f8' : '' }}
        />

        {((useBudgetActive && !showBudgetInputs) && (budget > 0)) && (
          <Button text='Editar' onClick={showBudgetInputsSwitch}/>
        )}
      </div>

      {(useBudgetActive && showBudgetInputs) && (
        <form onSubmit={onSubmitHandler}>
          <Input
            labelText="Presupuesto"
            placeholder={`1000 ${currency.symbol}`}
            value={budgetListener}
            onChange={e => budgetOnChange(e)}/>
          <Button text={'Aplicar'} type="submit"/>
          <Button text="Cancelar" onClick={cancelHandler} type="button"/>
        </form>
      )}
      {useBudgetActive && budget > 0 && (
        <BudgetVisualizer budget={budget}/>)}
    </>
  )
}

export default Budget