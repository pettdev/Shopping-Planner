const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const highlightMatch = (text, search) => { // ¡Función JavaScript simple!
  if (!search.trim()) return text;

  const regex = new RegExp(`(${escapeRegExp(search)})`, 'i');
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (i === 1) return <b key={i}>{part}</b>;
    return <span key={i}>{part}</span>;
  });
};