import { ComposedProvider } from "../utils/ComposedProvider"
import { 
  CurrencyProvider,
  SelectedItemProvider ,
  SearchResultsProvider, 
  ItemsListProvider, 
  BudgetContextProvider, 
  DollarRateProvider, 
  TotalProvider,
} from "./index"

const providers = [
  CurrencyProvider,
  DollarRateProvider,
  TotalProvider,
  ItemsListProvider,
  SelectedItemProvider,
  SearchResultsProvider,
  BudgetContextProvider
]

export const AppProviders = ({ children }) => {
  return <ComposedProvider providers={providers}>{children}</ComposedProvider>
}