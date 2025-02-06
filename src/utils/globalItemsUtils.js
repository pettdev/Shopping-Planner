import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../firebase/config"


const generateId = (name, brand) => {

  return brand ? `${name}-${brand}` : name;
}


export const addGlobalItems = async (globalItem) => {
  try {
    if (!globalItem || !globalItem.name|| !globalItem.netWeight || !globalItem.category) {
      throw new Error('Item inválido. Asegúrate de enviar un objeto compatible');
    }

    // Generar el id usando la función generateId con normalización
    const id = generateId(globalItem.name, globalItem.brand);

    const globalItemRef = doc(db, 'globalItems', id);
    const globalItemSnap = await getDoc(globalItemRef);
    
    if (!globalItemSnap.exists()) {
      await setDoc(globalItemRef, {
        name: globalItem.name,
        category: globalItem.category,
        description: globalItem.description,
        brand: globalItem.brand,
        netWeight: globalItem.netWeight,
        weightUnit: globalItem.weightUnit,
        createdAt: serverTimestamp(),
        lastUpdate: serverTimestamp()
      });
      console.log('Item global agregado exitosamente:', globalItem);
    } else {
      console.log('El item ya existe:', globalItem);
    }
  } catch (error) {
    console.error('Error agregando el item global.', error);
  }
}
