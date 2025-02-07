import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../firebase/config"


const generateId = (name, brand, netWeight, weightUnit) => {

  return brand ? `${name}-${brand}-${netWeight}-${weightUnit}` : `${name}-${netWeight}`;
}


export const addGlobalItems = async (globalItem) => {

  try {
    if (!globalItem || !globalItem.name|| !globalItem.netWeight || !globalItem.category || !globalItem.weightUnit) {
      throw new Error('Item inválido. Asegúrate de enviar un objeto compatible');
    }

    // Generar el id
    const id = generateId(globalItem.name, globalItem.brand, globalItem.netWeight, globalItem.weightUnit);

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
