import { db } from '../../../../../../firebase/config';
import { collection, query, where, getDocs, limit} from 'firebase/firestore';
import { calculateRelevance } from '../../../../../../utils';


const performSearch = async (term) => { // Elimina useCallback
  if (!term.trim()) {
    return [];
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
      .map(doc => {
        const data = doc.data() // Tambien están searchTokens, createdAt, y lastAt
        return {
          id: doc.id,
          name: data.name,
          category: data.category,
          brand: data.brand,
          description: data.description,
          netWeight: data.netWeight,
          weightUnit: data.weightUnit
        }})
      .sort((a, b) =>
        calculateRelevance(b, searchTerms) - calculateRelevance(a, searchTerms)
      )
      .slice(0, 10);

    return sortedResults;
  } catch (error) {
    console.error('Error en búsqueda:', error);
    return [];
  }
};

export default performSearch;