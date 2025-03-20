import {createContext, useContext, useState, useEffect} from "react"
import { initializeShoppingPlanner } from "../../utils"
import { useTotal } from "../"

const ItemsListContext = createContext()

const ItemsListProvider = ({ children }) => {
  const WARN_ITEM_EXISTE = "Item ya existe en la lista"

  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { initializeTotal } = useTotal()

  console.log(list)

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const initialData = await initializeShoppingPlanner()
        if (initialData) {
          console.log('Initial data loaded:', initialData)
          setList(initialData.list || [])
          
          // Initialize total from loaded list
          if (initialData.list) {
            initializeTotal(initialData.list)
          }
        }
      } catch (error) {
        console.error('Error loading initial data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadInitialData()
  }, [initializeTotal])

  const updateList = (newItem) => {
    if (list.some(item => item.id === newItem.id)) { // Verifica *antes* de actualizar el estado
      alert(WARN_ITEM_EXISTE)
      return
    }
    setList((prevList) => [...prevList, newItem]) // Actualiza el estado *solo* si no existe
  }
  
  // Effect to update total whenever list changes
  useEffect(() => {
    if (list && list.length > 0) {
      initializeTotal(list)
    }
  }, [list, initializeTotal])

  return (
    <ItemsListContext.Provider value={{ list, setList, updateList, isLoading }}>
      {isLoading ? <div>Cargando...</div> : children}
    </ItemsListContext.Provider>
  )
}

export const useItemsList = () => {
    const context = useContext(ItemsListContext)
    if(!context) throw new Error('useItemsList must be used within an ItemsListProvider component')
    return context
}

export default ItemsListProvider