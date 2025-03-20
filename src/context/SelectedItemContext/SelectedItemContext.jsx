import { useItemsList } from "../ItemsListContext";
import {createContext, useContext, useState} from "react";

const SelectedItemContext = createContext()

const SelectedItemProvider = ({children}) => { 
    const [item, setItem] = useState({})
    const updateItem = (newItem) => setItem(newItem)
    
    return (
        <SelectedItemContext.Provider value={ {item, updateItem} }>
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