import { CheckToggler } from "../../../common"
import { BudgetVisualizer } from './BudgetVisualizer'
import { useBudget } from "../../../../context"
import { useEffect } from "react"
import { useTotal } from "../../../../context/TotalContext"

const Budget = () => {
  const {budget, updateBudget} = useBudget()
  const { total } = useTotal()

  useEffect(() => {
    console.log(`Presupuesto actualizado: ${budget}`);
  }, [budget]);

  const applyOnClickHandler = () => {
    // To be implemented
  }
  return (
    <CheckToggler
      id={'budget'}
      labelText={'Calcular presupuesto'}
      renderOnCondition={true}

      conditionalInputType={'text'}
      conditionalPlaceholder={'Ingresar presupuesto'}
      conditionalButtonLabel={'Aplicar'}
      conditionalOnChange={updateBudget}
      conditionalValue={budget}
      conditionalOnClick={applyOnClickHandler}
    >
      <BudgetVisualizer budget={budget} totalSpent={total}/>
    </CheckToggler>
  )
}

export default Budget