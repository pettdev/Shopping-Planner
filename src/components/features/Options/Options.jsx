import DollarRateToggler from "./DollarRateToggler"
import { DollarRateProvider, BudgetContextProvider } from "../../../context"
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
    </>
  )
}

export default Options