import DollarRateToggler from "./DollarRateToggler"
import { DollarRateProvider } from "../../../context/DollarRateContext"

function Options() {
  return (
    <DollarRateProvider>
      <DollarRateToggler/>
    </DollarRateProvider>
  )
}

export default Options