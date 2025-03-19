import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../firebase/config"

const generateId = (name, brand, netWeight, weightUnit) => {
  // Permitir letras acentuadas y caracteres especiales del español
  const cleanName = name
    .normalize("NFD")  // Normalizar caracteres
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑëË]/g, '')

  const cleanUnit = weightUnit.split(',')[0].trim()

  const cleanBrand = brand
    ?.normalize("NFD")  // Normalizar caracteres
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑëË]/g, '') || null
  
  const numericWeight = parseFloat(netWeight)

  const cleanWeight = numericWeight % 1 === 0 
    ? numericWeight.toString() 
    : numericWeight.toFixed(2).replace(/\.?0+$/, '')

  return cleanBrand 
    ? `${cleanWeight}_${cleanUnit}_${cleanName}_${cleanBrand}`
    : `${cleanWeight}_${cleanUnit}_${cleanName}`
}

export const addGlobalItem = async (globalItem) => {
  try {
    if (!globalItem?.name || !globalItem?.netWeight || !globalItem?.category || !globalItem?.weightUnit) {
      throw new Error('Item inválido')
    }

    // Generación avanzada de tokens
    const searchTokens = [
      // Tokens del nombre (palabras completas + substrings)
      ...globalItem.name.toLowerCase().split(/\s+/g).flatMap(word => 
        Array.from({length: word.length}, (_, i) => word.substring(0, i + 1))
      ),
      
      // Tokens de marca (si existe)
      ...(globalItem.brand ? 
        globalItem.brand.toLowerCase().split(/\s+/g).flatMap(word => 
          Array.from({length: word.length}, (_, i) => word.substring(0, i + 1))
        ) 
        : []),
      
      // Tokens numéricos y combinaciones
      globalItem.netWeight.toString(),
      globalItem.weightUnit.toLowerCase(),
      `${parseFloat(globalItem.netWeight)}${globalItem.weightUnit.split(',')[0].trim()}`,
      
      // Tokens completos para prioridad
      globalItem.name.toLowerCase(),
      ...(globalItem.brand ? [globalItem.brand.toLowerCase()] : [])
    ].filter((t, i, arr) => t && arr.indexOf(t) === i)

    const id = generateId(
      globalItem.name,
      globalItem.brand,
      globalItem.netWeight,
      globalItem.weightUnit
    )

    const globalItemRef = doc(db, 'globalItems', id)
    await setDoc(globalItemRef, {
      ...globalItem,
      searchTokens,
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp()
    })

    console.log('Agregado exitoso. Item:', globalItem)

  } catch (error) {
    console.error('Error agregando item:', error)
  }
}