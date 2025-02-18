import { ComposedProvider } from "../utils/ComposedProvider";
import { 
  SelectedItemProvider ,
  SearchResultsProvider, 
  ItemsListProvider, 
  BudgetContextProvider, 
  DollarRateProvider, 
  TotalProvider
} from "./index";

const providers = [
  SelectedItemProvider,
  SearchResultsProvider,
  ItemsListProvider,
  BudgetContextProvider,
  DollarRateProvider,
  TotalProvider,
];

export const AppProviders = ({ children }) => {
  return <ComposedProvider providers={providers}>{children}</ComposedProvider>;
};