const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const highlightMatch = (text, search) => {
  if (!search.trim()) return text

  const regex = new RegExp(`(${escapeRegExp(search)})`, 'i')
  const parts = text.split(regex)

  return parts.map((part, i) => {
    if (i === 1) return <span className="itemCoincidentialCharacter" key={i}>{part}</span>
    return <span className="itemSearched" key={i}>{part}</span>
  })
}