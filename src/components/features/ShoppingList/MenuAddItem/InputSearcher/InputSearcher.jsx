// Importación de dependencias y estilos
import './InputSearcher.css';
import { useState, useEffect, useCallback } from 'react';
import { useSearchResults } from '../../../../../context/SearchResultsContext';
import { db } from '../../../../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Input } from '../../../../common';

const InputSearcher = () => {
  // Estados locales
  const [timeoutId, setTimeoutId] = useState(null); // Almacena el ID del temporizador de debounce
  const [inputValue, setInputValue] = useState(''); // Valor actual del input
  const [allItems, setAllItems] = useState([]); // Almacena todos los productos de la base de datos
  const { searchState, resultsState } = useSearchResults(); // Acceso al contexto de búsqueda
  
  // Desestructuración de valores del contexto
  const { searchTerm, updateSearchTerm } = searchState; // Término de búsqueda actual
  const { results, updateResults } = resultsState; // Resultados actuales de la búsqueda

  // Efecto para cargar todos los productos al montar el componente
  useEffect(() => {
    const loadAllItems = async () => {
      // Obtener todos los documentos de la colección 'globalItems'
      const snapshot = await getDocs(collection(db, 'globalItems'));
      // Mapear los documentos y agregar versión en minúsculas del nombre
      setAllItems(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          nameLower: doc.data().name.toLowerCase() // Versión en minúsculas para búsquedas
        }))
      );
    };
    loadAllItems();
  }, []); // El array vacío [] asegura que solo se ejecute una vez

  // Sincronizar el valor del input con el contexto de búsqueda
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]); // Se ejecuta cuando cambia searchTerm

  // Maneja cambios en el input con debounce
  const handleInputChange = (value) => {
    setInputValue(value); // Actualiza el estado local inmediatamente
    
    // Limpiar el temporizador anterior para evitar múltiples ejecuciones
    if (timeoutId) clearTimeout(timeoutId);
    
    // Nuevo temporizador para actualizar el término de búsqueda después de 300ms
    setTimeoutId(
      setTimeout(() => {
        updateSearchTerm(value); // Actualiza el contexto de búsqueda
      }, 300)
    );
  };

  // Función para resaltar coincidencias en el texto (memoizada con useCallback)
  const highlightMatch = useCallback((text, search) => {
    if (!search.trim()) return text; // Si no hay término de búsqueda, devolver texto normal
    
    // Crear expresión regular para buscar coincidencias:
    // - `gi`: flags para búsqueda global (todas las coincidencias) e insensible a mayúsculas
    // - escapeRegExp: previene errores con caracteres especiales como . * etc.
    const regex = new RegExp(`(${escapeRegExp(search)})`, 'gi');
    
    // Dividir el texto en partes: [texto-no-coincidente, coincidencia, texto-no-coincidente, ...]
    return text.split(regex).map((part, i) => 
      // Si el índice es impar, es una coincidencia (las partes alternan)
      i % 2 === 1 ? <b key={i}>{part}</b> : part
    );
  }, []); // useCallback memoiza la función para evitar recrearla en cada render

  // Efecto principal de búsqueda
  useEffect(() => {
    if (!searchTerm) {
      updateResults([]); // Limpiar resultados si no hay término de búsqueda
      return;
    }

    const searchLower = searchTerm.toLowerCase(); // Término de búsqueda en minúsculas
    const filtered = allItems
      .filter(item => item.nameLower.includes(searchLower)) // Filtrado por coincidencia parcial
      .slice(0, 10); // Limitar a máximo 10 resultados

    updateResults(filtered); // Actualizar resultados en el contexto
  }, [searchTerm, allItems]); // Se ejecuta cuando cambia el término de búsqueda o los datos

  return (
    <div className='divRelative'>
      {/* Componente Input personalizado */}
      <Input
        labelText={'Producto:'}
        id={'searcher'}
        type={'text'}
        value={inputValue}
        placeholder={'Escribe un producto'}
        onChange={(e) => handleInputChange(e.target.value)}
      />

      {/* Lista de resultados */}
      {results.length > 0 && (
        <div className='divResults'>
          {results.map((result, index) => (
            <div
              className='divSelection'
              key={index}
              onClick={() => {
                console.log('Seleccionado:', result);
                updateResults([]); // Limpiar resultados al seleccionar
              }}
            >
              {/* Resaltar coincidencias en el nombre del producto */}
              {highlightMatch(result.name, searchTerm)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Función para escapar caracteres especiales en expresiones regulares
function escapeRegExp(string) {
  // Reemplaza caracteres especiales con sus versiones escapadas (ej: '*' -> '\*')
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default InputSearcher;