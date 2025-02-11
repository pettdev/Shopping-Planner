import DollarRateToggler from "./DollarRateToggler"
import { DollarRateProvider, BudgetContextProvider } from "../../../context"
import { CreateItemForm } from "./CreateItemForm"
import {Budget} from "./Budget"

function Options() {
  return (
    <>
      <BudgetContextProvider>
        <Budget/> 
      </BudgetContextProvider>
      
      <DollarRateProvider>
        <DollarRateToggler/>
      </DollarRateProvider>

      <CreateItemForm/>
    </>
  )
}

export default Options