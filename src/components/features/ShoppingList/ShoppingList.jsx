import { ItemsListProvider } from "../../../context/ItemsListContext"
import { SearchResultsContextProvider } from "../../../context/SearchResultsContext"
ItemsListProvider
import MenuAddItem from "./MenuAddItem/MenuAddItem"


function ShoppingList() {
  
  return (
    <SearchResultsContextProvider>
      <ItemsListProvider>
        <MenuAddItem/>
      </ItemsListProvider>
    </SearchResultsContextProvider>
  )
}

export default ShoppingList