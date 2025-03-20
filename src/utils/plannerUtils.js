import { db } from '../firebase/config'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc, addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';

// INICIALIZAR LA ESTRUCTURA (defaultList y currentList)
export const initializeShoppingPlanner = async () => {
  try {
    const defaultListRef = doc(db, 'shoppingLists', 'defaultList')
    const defaultListSnap = await getDoc(defaultListRef)

    if (!defaultListSnap.exists()) {
      await setDoc(defaultListRef, {
        createdAt: serverTimestamp()
      })
      console.log('Documento de la lista por defecto creada en Firebase')
    }
    const currentListRef = doc(db, 'shoppingLists', 'defaultList', 'currentList', 'current')
    const currentListSnap = await getDoc(currentListRef)

    if(!currentListSnap.exists()) {
      await setDoc(currentListRef, {
        name: 'Mi lista',
        createdAt: serverTimestamp(),
        lastUpdate: serverTimestamp(),

        options: {
          useBudget: false,
          useDollarRate: false,
          budget: 0,
          dollarRate: 0
        },

        isCurrent: true
        })
        console.log('Colección de lista por defecto creada en Firebase')
    } else {
      return currentListSnap.data()
    }
    
  } catch (error) {
    console.error('Error en initializePlanner:', error);
  }
}

// ACTUALIZAR LA LISTA ACTUAL
export const updateList = async (newData) => {
  try {
    const currentListRef = doc(db, 'shoppingLists', 'defaultList', 'currentList', 'current')
    await updateDoc(currentListRef, {
      ...newData,
      lastUpdate: serverTimestamp()
    })
    console.log('currentList actualizada')
  } catch (error) {
    console.error('Error en updateCurrentList:', error);
  }

}

// GUARDAR LA LISTA ACTUAL EN savedLists
export const saveList = async (total = null) => {
  try {
    const currentListRef = doc(db, 'shoppingLists', 'defaultList', 'currentList', 'current')
    const currentListSnap = await getDoc(currentListRef)
    
    if(currentListSnap.exists()) {
      // data() retrieves all fields in the document as an Object.
      const currentListData = currentListSnap.data()

      // Gets a CollectionReference instance that refers to the collection at the specified absolute path.
      const savedListsRef = collection(db, 'shoppingLists', 'defaultList', 'savedLists')
      
      // Marcar como no actual, y obtener el resto de los datos antes de guardarla
      const newSavedListData = {
        ...currentListData, 
        isCurrent: false,
        // Guardar el total si se proporciona, o usar el que ya existe en los datos
        total: total !== null ? total : (currentListData.total || 0)
      }
      
      // 'addDoc()': 'Add a new document to specified CollectionReference with the given data, 
      // assigning it a document ID automatically'

      // Guardar la lista (newSavedListData) en la ubicación de la colección de listas (savedListsRef)
      await addDoc(savedListsRef, newSavedListData)

      console.log(`Lista '${newSavedListData.name}' guardada con éxito (total: ${newSavedListData.total})`)
      
    } else {
      console.warn('No se encontró currentListRef para guardar')
    }
    
  } catch (error) {
    console.error('Error en savedCurrentList:', error)
  }
}

// CREAR UNA NUEVA LISTA
export const createNewList = async (total = null) => {
  try {
    // Primero guardar la lista actual con el total actual
    await saveList(total)

    // Luego, resetear todos los campos con valores por defecto
    const currentListRef = doc(db, 'shoppingLists', 'defaultList', 'currentList', 'current')
    await updateDoc(currentListRef, {
      name: 'Mi Lista',
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
      options: {
        useBudget: true,
        useDollarRate: false,
        budget: 0,
        dollarRate: 0
      },
      isCurrent: true
    })
    console.log('currentList se reseteó a valores por defecto para lista nueva exitosamente.')
    

  } catch (error) {
    console.error('Error en createNewList:', error)
  }
}

// CAMBIAR DE LA LISTA ACTUAL A LA LISTA GUARDADA
export const switchToSavedList = async(savedListId) => {
  try {
    const savedListRef = doc(db, 'shoppingLists', 'defaultList', 'savedLists', savedListId)
    const savedListSnap = await getDoc(savedListRef)

    if (savedListSnap.exists()) {
      const savedListData = savedListSnap.data()
      const currentListRef = doc(db, 'shoppingLists', 'defaultList', 'currentList', 'current')

      // Asegurarse de que el total se mantenga cuando se cambia a una lista guardada
      await updateDoc(currentListRef, {
        ...savedListData,
        isCurrent: true,
        lastUpdate: serverTimestamp(),
        // Mantener el total guardado o usar 0 si no existe
        total: savedListData.total || 0
      })
      console.log('Lista actual cambiada por la lista guardada:', savedListId, 'con total:', savedListData.total || 0)
    } else {
      console.warn('No se encontró la lista guardada con id:', savedListId)
    }
    
  } catch (error) {
    console.error('Error en switchToSavedList:', error)
  }
}

// ELIMINAR UNA LISTA GUARDADA
export const deletedSavedList = async (savedListId) => {
  try {
    const savedListRef = doc(db, 'shoppingLists', 'defaultList', 'savedLists', savedListId)

    // 'deleteDoc()', 'Deletes the document referred to by the specified DocumentReference'
    await deleteDoc(savedListRef)
    console.log('Lista guardada eliminada exitosamente. ID: ', savedListId)
    
  } catch (error) {
    console.error('Error al intentar eliminar la lista guardada:', error)
  }
}

// OBTENER LISTAS GUARDADAS
export const getSavedLists = async () => {
  try {
    const savedListsRef = collection(db, 'shoppingLists', 'defaultList', 'savedLists')
    const savedListsSnap = await getDocs(savedListsRef)

    if (!savedListsSnap.empty) {
      const savedLists = savedListsSnap.docs.map(doc => doc.data())
      console.log('Listas guardadas recopiladas exitosamente:', savedLists)
      return savedLists
    }

    console.warn('Listas no encontradas')
    return []
    
  } catch (error) {
    console.error('Error al recopilar listas guardadas:', error)
  }
}