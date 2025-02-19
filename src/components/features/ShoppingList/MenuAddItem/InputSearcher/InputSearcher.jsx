import './InputSearcher.css'
import { useState, useEffect } from 'react';
import { useSearchResults } from '../../../../../context/SearchResultsContext';
import { useSelectedItem } from '../../../../../context/SelectedItemContext';
import performSearch from './helpers/performSearch';
import { Input } from '../../../../common';
import { highlightMatch } from '../../../../../utils';

const InputSearcher = () => {
  const [inputValue, setInputValue] = useState('');
  const { searchState, resultsState } = useSearchResults();
  const { searchTerm, updateSearchTerm } = searchState;
  const { results, updateResults } = resultsState;
  const { updateItem } = useSelectedItem()

  useEffect(() => {
    const handler = setTimeout(() => {
      (async () => {
        const searchResults = await performSearch(searchTerm)
        updateResults(searchResults)
      })()
    }, 150)

    return () => clearTimeout(handler);
  }, [searchTerm, updateResults]);

  return (
    <div className="searchBox">
      <Input
        labelText="Producto:"
        id="searcher"
        type="text"
        value={inputValue}
        placeholder="Escribe un producto"
        onChange={(e) => {
          setInputValue(e.target.value);
          updateSearchTerm(e.target.value);
        }}
      />

      {results.length > 0 && (
        <div className="results">
          {results.map((result, index) => (
            <div
              className="selection"
              key={index}
              onClick={() => {
                updateItem(result) // GUARDAR ITEM EN EL CONTEXTO
                setInputValue(result.name); // Se introduce la selección en el input
                updateResults([]);
              }}
            >
              <div className="itemName">
                {highlightMatch(result.name, searchTerm)}
              </div>
              <div className="itemProps">
                {result.brand
                  ? `${result.netWeight} ${result.weightUnit}, ${result.brand}`
                  : `${result.netWeight} ${result.weightUnit}`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputSearcher;
