import { createContext, useContext, useState, useEffect } from "react"
import { DecimalInputSanitizer } from "../../utils"
import { exchangeVESforUSD as exchanger } from "../CurrencyContext/helpers/exchangeVESforUSD"

const DollarRateContext = createContext()

const DollarRateProvider = ({ children }) => {
    const [rate, setRate] = useState(1)
    const validator = new DecimalInputSanitizer()

    // Initialize exchanger rate when component mounts
    useEffect(() => {
        exchanger.setRate(1)
    }, [])

    const updateRate = (newRate) => {
        const sanitizedRate = validator.getSanitizedOf(newRate)
        const oldRate = rate
        setRate(sanitizedRate)
        exchanger.setRate(sanitizedRate)
        
        // Get the quote currency and recalculate its amount based on the rate change
        const dollar = exchanger.quoteCurrency
        if (dollar && dollar.recalculateAmountOnRateChange) {
            dollar.recalculateAmountOnRateChange(oldRate)
        }
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