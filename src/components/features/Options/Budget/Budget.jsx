import { CheckToggler } from "../../../common"
import { BudgetVisualizer } from './BudgetVisualizer'
import { useBudget } from "../../../../context"
import { useEffect } from "react"

const Budget = () => {
  const {budget, updateBudget} = useBudget()

  useEffect(() => {
    console.log(`Presupuesto actualizado: ${budget}`);
  }, [budget]);
  
  return (
    <>
    <CheckToggler
      id={'budget'}
      labelText={'Calcular presupuesto'}
      renderOnCondition={true}
      conditionalInputType={'text'}
      conditionalPlaceholder={'Ingresar presupuesto'}
      conditionalButtonLabel={'Aplicar'}
      conditionalOnChange={updateBudget}>
      <BudgetVisualizer budget={budget}/>
    </CheckToggler>
    </>
  )
}

export default Budget