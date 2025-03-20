import { useTotal } from "../TotalContext";
import { useItemsList } from "../ItemsListContext";
import {createContext, useContext, useState} from "react";

const SelectedItemContext = createContext()

const SelectedItemProvider = ({children}) => { 
    const [item, setItem] = useState({})
    const { list, setList } = useItemsList()
    const updateItem = (newItem) => setItem(newItem)

    const updateItemQuantityAndPrice = (item) => {
        const updatedItem = {
          ...item,
          quantity: parseFloat(item.quantity),
          price: parseFloat(item.price),
          subtotal: parseFloat(item.quantity) * parseFloat(item.price)
        }
        setList(updatedItem)
      }
    
    return (
        <SelectedItemContext.Provider value={ {item, updateItem, updateItemQuantityAndPrice} }>
            {children}
        </SelectedItemContext.Provider>
    )
}

export const useSelectedItem = () => {
    const context = useContext(SelectedItemContext)
    if(!context) throw new Error('useSelectedItem must be used within a SelectedItemProvider component')
    return context
}

export default SelectedItemProvider