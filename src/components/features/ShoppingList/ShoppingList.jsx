import { SearchResultsContextProvider } from "../../../context/SearchResultsContext"
import MenuAddItem from "./MenuAddItem/MenuAddItem"


function ShoppingList() {
  
  return (
    <SearchResultsContextProvider>
      <MenuAddItem/>
    </SearchResultsContextProvider>
  )
}

export default ShoppingList