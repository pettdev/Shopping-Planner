export const calculateRelevance = (item, searchTerms) => { // Función JavaScript simple
  let score = 0;
  const lowerName = item.name.toLowerCase();

  searchTerms.forEach(term => {
    if (lowerName === term) score += 10;
    else if (lowerName.startsWith(term)) score += 5;
    else if (lowerName.includes(term)) score += 3;

    if (item.brand?.toLowerCase().includes(term)) score += 2;
  });

  return score;
};