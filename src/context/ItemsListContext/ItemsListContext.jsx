import {createContext, useContext, useState} from "react";

const ItemsListContext = createContext()

export const ItemsListProvider = ({children}) => {
    // Usando nombres más descriptivos: items y setItems
    const [items, setItems] = useState([]);

    // Actualizando la función updateList para usar los nuevos nombres
    const updateList = (newItem) => setItems([...items, newItem]);

    return (
        <ItemsListContext.Provider value={ {list: items, updateList} }>
            {children}
        </ItemsListContext.Provider>
    )
}

export const useItemsList = () => {
    const context = useContext(ItemsListContext)
    if(!context) throw new Error('useItemsList must be used within a ItemsListProvider component')
    return context
}