import './InputSearcher.css'
import { useState, useEffect, useCallback } from 'react';
import { useSearchResults } from '../../../../../context/SearchResultsContext';
import { db } from '../../../../../firebase/config';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { Input } from '../../../../common';
import { highlightMatch, calculateRelevance } from '../../../../../utils';

const InputSearcher = () => {
  const [inputValue, setInputValue] = useState('');
  const { searchState, resultsState } = useSearchResults();
  const { searchTerm, updateSearchTerm } = searchState;
  const { results, updateResults } = resultsState;

  const performSearch = useCallback(async (term) => {
    if (!term.trim()) {
      updateResults([]);
      return;
    }

    try {
      const searchTerms = term.toLowerCase().split(/\s+/g);
      const allSubstrings = searchTerms.flatMap(t => 
        Array.from({length: t.length}, (_, i) => t.substring(0, i + 1))
      );

      const q = query(
        collection(db, 'globalItems'),
        where('searchTokens', 'array-contains-any', allSubstrings.slice(0, 10)),
        limit(10)
      );

      const snapshot = await getDocs(q);
      const sortedResults = snapshot.docs
        .map(doc => doc.data())
        .sort((a, b) => 
          calculateRelevance(b, searchTerms) - calculateRelevance(a, searchTerms)
        )
        .slice(0, 10); // Mostrar top 10

      updateResults(sortedResults);
    } catch (error) {
      console.error('Error en búsqueda:', error);
      updateResults([]);
    }
  }, [updateResults, calculateRelevance]);

  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(searchTerm);
    }, 150);

    return () => clearTimeout(handler);
  }, [searchTerm, performSearch]);

  return (
    <div className="divRelative">
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
        <div className="divResults">
          {results.map((result, index) => (
            <div
              className="divSelection"
              key={index}
              onClick={() => {
                console.log("Seleccionado:", result);
                updateResults([]);
              }}
            >
              {highlightMatch(result.name, searchTerm)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default InputSearcher;