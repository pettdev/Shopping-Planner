import { ComposedProvider } from "../../../utils/ComposedProvider"
import { DollarRateToggler } from './DollarRateToggler'
import { DollarRateProvider, BudgetContextProvider } from "../../../context"
import { CreateItemForm } from "./CreateItemForm"
import { Budget } from "./Budget"
import { TotalProvider } from "../../../context/TotalContext"


function Options() {
  return (
    <ComposedProvider providers={
      [BudgetContextProvider, DollarRateProvider,
       TotalProvider]}
    >
      <Budget/>
      <DollarRateToggler/>
      <CreateItemForm/>

    </ComposedProvider>  
  )
}

export default Options