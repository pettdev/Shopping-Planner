import { createContext, useContext, useState } from "react";

const DollarRateContext = createContext()

const DollarRateProvider = ({children}) => { 
    const [price, setPrice] = useState(0)

    const updatePrice = (newPrice) => setPrice(newPrice)

    return (
        <DollarRateContext.Provider value={ {price, updatePrice} }>
            {children}
        </DollarRateContext.Provider>
    )
}

export const useDollarRate = () => {
    const context = useContext(DollarRateContext)
    if(!context) throw new Error('useDollarRate must be used within a DollarRateProvider component')
    return context
}

export default DollarRateProvider