import { createContext, useContext, useState } from "react";
import { DecimalInputSanitizer } from "../../utils";

const DollarRateContext = createContext()

const DollarRateProvider = ({ children }) => {
    const [rate, setRate] = useState('')
    const validator = new DecimalInputSanitizer()

    const updateRate = (newRate) => {
        const sanitizedRate = validator.getSanitizedOf(newRate)
        setRate(sanitizedRate)
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