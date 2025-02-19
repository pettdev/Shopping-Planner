import { ComposedProvider } from "../utils/ComposedProvider"
import { 
  CurrencyProvider,
  SelectedItemProvider ,
  SearchResultsProvider, 
  ItemsListProvider, 
  BudgetContextProvider, 
  DollarRateProvider, 
  TotalProvider
} from "./index"

const providers = [
  CurrencyProvider,
  SelectedItemProvider,
  SearchResultsProvider,
  ItemsListProvider,
  BudgetContextProvider,
  DollarRateProvider,
  TotalProvider,
]

export const AppProviders = ({ children }) => {
  return <ComposedProvider providers={providers}>{children}</ComposedProvider>
}