import {createContext, useContext, useState} from "react"

const ItemsListContext = createContext()

const ItemsListProvider = ({ children }) => {
  const WARN_ITEM_EXISTE = "Item ya existe en la lista"

  const [list, setList] = useState([])

  const updateList = (newItem) => {
    if (list.some(item => item.id === newItem.id)) { // Verifica *antes* de actualizar el estado
      alert(WARN_ITEM_EXISTE)
      return
    }
    setList((prevList) => [...prevList, newItem]) // Actualiza el estado *solo* si no existe
  }

  return (
    <ItemsListContext.Provider value={{ list, updateList }}>
      {children}
    </ItemsListContext.Provider>
  )
}

export const useItemsList = () => {
    const context = useContext(ItemsListContext)
    if(!context) throw new Error('useItemsList must be used within an ItemsListProvider component')
    return context
}

export default ItemsListProvider