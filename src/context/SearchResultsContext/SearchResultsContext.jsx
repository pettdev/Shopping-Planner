import { createContext, useContext, useState, useMemo } from "react";

const SearchResultsContext = createContext()

export const SearchResultsProvider = ({children}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  const updateSearchTerm = (newSearchTerm) => setSearchTerm(newSearchTerm)
  const updateResults = (newResults) =>  setResults(newResults)

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    searchState: { searchTerm, updateSearchTerm: setSearchTerm },
    resultsState: { results, updateResults: setResults }
  }), [searchTerm, results]);

  return (
    <SearchResultsContext.Provider value={contextValue}>
      {children}
    </SearchResultsContext.Provider>
  )
}

export const useSearchResults = () => {
  const context = useContext(SearchResultsContext)

  if(!context) throw new Error("The component that uses useSearchResults function must be placed within a SearchResultsContext component");
  
  return context
}