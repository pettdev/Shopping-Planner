import { ItemsListProvider } from "../../../context/ItemsListContext"
import { SearchResultsProvider } from "../../../context/SearchResultsContext"
import { SelectedItemProvider } from '../../../context/SelectedItemContext'
import { TotalProvider } from "../../../context/TotalContext/TotalContext"
import MenuAddItem from "./MenuAddItem/MenuAddItem/MenuAddItem"
import ItemList from "./MenuAddItem/ItemList"
import {ComposedProvider} from '../../../utils/ComposedProvider'


function ShoppingList() {
  return (
    <ComposedProvider providers={[
      SearchResultsProvider,ItemsListProvider,
      SelectedItemProvider,TotalProvider]}
    >
      <MenuAddItem/>
      <ItemList/>
      
    </ComposedProvider>
  );
}

export default ShoppingList