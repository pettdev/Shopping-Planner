import './InputSearcher.css'
import { useState, useEffect } from 'react';
import { useSearchResults } from '../../../../../context/SearchResultsContext';
import { db } from '../../../../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Input } from '../../../../common';

const InputSearcher = () => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [inputValue, setInputValue] = useState(''); // Estado local para el input
  const { searchState, resultsState } = useSearchResults();
  const { searchTerm, updateSearchTerm } = searchState;
  const { results, updateResults } = resultsState;

  // Sincronizar el estado inicial del contexto
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (value) => {
    // Actualizar estado local inmediatamente
    setInputValue(value);
    
    // Debounce para la búsqueda real
    if (timeoutId) clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      updateSearchTerm(value);
    }, 300);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  useEffect(() => {
    const search = async () => {
      if (searchTerm.length === 0) {
        updateResults([]);
        return;
      }
      try {
        const q = query(
          collection(db, 'globalItems'),
          where('name', '>=', searchTerm),
          where('name', '<=', searchTerm + '\uf8ff')
        );
        const querySnapshot = await getDocs(q);
        const newResults = querySnapshot.docs.map(doc => doc.data());
        updateResults(newResults);
      } catch (error) {
        console.error('Error de búsqueda:', error);
        updateResults([]);
      }
    };
    search();
  }, [searchTerm]);

  return (
    <div className='divRelative'>
      <Input
        labelText={'Producto:'}
        id={'searcher'}
        type={'text'}
        value={inputValue}
        placeholder={'Escribe un producto'}
        onChange={(e) => handleInputChange(e.target.value)}
      />

      {results.length > 0 && (
        <div className='divResults'>
          {results.slice(0,8).map((result, index) => (
            <div className='divSelection' key={index}
              onClick={() => {
                console.log('Seleccionado:', result)
                updateResults([])}}
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputSearcher;