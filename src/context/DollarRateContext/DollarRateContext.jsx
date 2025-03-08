import { createContext, useContext, useState } from "react"
import { DecimalInputSanitizer } from "../../utils"
import { exchangeVESforUSD as exchanger } from "../CurrencyContext/helpers/exchangeVESforUSD"

const DollarRateContext = createContext()

const DollarRateProvider = ({ children }) => {
    const [rate, setRate] = useState(1)
    const validator = new DecimalInputSanitizer()

    const updateRate = (newRate) => {
        const sanitizedRate = validator.getSanitizedOf(newRate)
        setRate(sanitizedRate)
        console.log('sanitizedRate', sanitizedRate)
        exchanger.setRate(sanitizedRate)
    }

    return (
        <DollarRateContext.Provider value={{ rate, updateRate }}>
            {children}
        </DollarRateContext.Provider>
    )
}

export const useDollarRate = () => {
    const context = useContext(DollarRateContext)
    if (!context) throw new Error('useDollarRate must be used within a DollarRateProvider component')
    return context
}

export default DollarRateProvider