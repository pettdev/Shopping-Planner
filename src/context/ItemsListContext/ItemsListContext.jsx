import {createContext, useContext, useState} from "react";

const ItemsListContext = createContext()

export const ItemsListProvider = ({children}) => {

    const [list, setList] = useState([])

    const updateList = (newItem) => {
        setList((prevList) => {
          if (prevList.some(item => item.id === newItem.id)) {
            console.warn("El ítem ya existe");
            return prevList; // No agrega el ítem duplicado
          }
          return [...prevList, newItem];
        });
      };
      
      
      

    return (
        <ItemsListContext.Provider value={ {list, updateList} }>
            {children}
        </ItemsListContext.Provider>
    )
}

export const useItemsList = () => {
    const context = useContext(ItemsListContext)
    if(!context) throw new Error('useItemsList must be used within an ItemsListProvider component')
    return context
}