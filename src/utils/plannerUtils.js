import { db } from "../firebase/config"
import { doc, getDoc, serverTimestamp, setDoc, updateDoc, addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";

// INICIALIZAR LA ESTRUCTURA (defaultPlanner Y currentList)

export const initializePlanner = async () => {
  try {
    // Guardar defaultPlanner en una colección llamada planners
    // 'doc' crea una referencia a un documento (defaultPlannerRef) en la colección 'planners'
    // 'ref' es una convención para referirse a referencias de documentos
    // 'snap' es una convención para referirse a instantáneas de documentos
    const defaultPlannerRef = doc(db, "planners", "defaultPlanner")

    // 'getDoc' obtiene el documento referenciado por 'defaultPlannerRef'
    // 'await' espera a que la promesa de 'getDoc' se resuelva

    /**
     * getDoc() JSDoc
     * Reads the document referred to by this `DocumentReference` from cache.
     *
    */
    const plannerSnap = await getDoc(defaultPlannerRef)

    // 'exists' devuelve true si el documento plannerSnap existe
    if (!plannerSnap.exists()) {
      // 'setDoc' escribe/crea el documento referenciado en el primer parámetro si no existe
      // el segundo parámetro de 'setDoc' son los datos a escribir, en forma de mapa u objeto

    /*
     * setDoc() JSDoc
     * Writes to the document referred to by the specified `DocumentReference`. If
     * the document does not yet exist, it will be created. If you provide `merge`
     * or `mergeFields`, the provided data can be merged into an existing document.
     *
     * @param reference - A reference to the document to write.
     * @param data - A map of the fields and values for the document.
    */
      await setDoc(defaultPlannerRef, {
        createdAt: serverTimestamp()
      })
      console.log("defaultPlanner creado")
    }

    // Crear una referencia de ubicación para el documento 'current'
    // 'current' estará dentro de una subcolección 'currentList'
    // También se puede decir que doc() declara o describe la ruta donde 'current' estará
    // Esta ruta son pathSegments (un array de strings), y la cantidad de segmentos 
    // deben ser pares y llegar hasta [referir] un documento ('current')
    // Al usar setDoc(), todas las rutas especificadas, o referencia de 'current'
    // se crearán si no existen.
    
    // colección (planner), documento (defaultPlanner), subcolección (currentList), documento (current)
    const currentListRef = doc(db, "planners", "defaultPlanner", "currentList", "current")

    // Usando getDoc() para obtener los datos/leer el documento (current) indicado o referenciado con doc()
    const currentListSnap = await getDoc(currentListRef)

    // Si aún no existe el documento 'current', créalo con setDoc(), usando la referencia de 'current'
    // 'current' debe tener características
    if(!currentListSnap.exists()) {
      await setDoc(currentListRef, {
        name: 'Mi lista',
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

      console.log('lista actual creada')
    }
    
  } catch (error) {
    console.error('Error en initializePlanner:', error);
  }
}

// ACTUALIZAR LA LISTA ACTUAL

export const updateList = async (newData) => {
  try {
    /**
     * Updates fields in the document referred to by the specified
     * `DocumentReference` The update will fail if applied to a document that does
     * not exist.
     *
     * Nested fields can be updated by providing dot-separated field path
     * strings or by providing `FieldPath` objects.
     *
     * @param reference - A reference to the document to update.
     * @param field - The first field to update.
     * @param value - The first value.
     * @param moreFieldsAndValues - Additional key value pairs.
     * @returns A `Promise` resolved once the data has been successfully written
     * to the backend (note that it won't resolve while you're offline).
    */

    //'updateDoc' actualiza los campos en el documento ('current') referenciado con doc()
    const currentListRef = doc(db, 'planners', 'defaultPlanner', 'currentList', 'current')
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

export const saveList = async () => {
  try {
    const currentListRef = doc(db, 'planners', 'defaultPlanner', 'currentList', 'current')
    const currentListSnap = await getDoc(currentListRef)
    
    if(currentListSnap.exists()) {
      // data() retrieves all fields in the document as an Object.
      const currentListData = currentListSnap.data()

      // Gets a CollectionReference instance that refers to the collection at the specified absolute path.
      const savedListsRef = collection(db, 'planners', 'defaultPlanner', 'savedLists')
      
      // Marcar como no actual, y obtener el resto de los datos antes de guardarla
      const newSavedListData = {...currentListData, isCurrent: false}
      
      // 'addDoc()': 'Add a new document to specified CollectionReference with the given data, 
      // assigning it a document ID automatically'

      // Guardar la lista (newSavedListData) en la ubicación de la colección de listas (savedListsRef)
      await addDoc(savedListsRef, newSavedListData)

      console.log(`Lista '${newSavedListData.name}' guardada con éxito`)
      
    } else {
      console.warn('No se encontró currentListRef para guardar')
    }
    
  } catch (error) {
    console.error('Error en savedCurrentList:', error)
  }
}

// CREAR UNA NUEVA LISTA

export const createNewList = async () => {
  try {
    // Primero guardar la lista actual
    await saveList()

    // Luego, resetear todos los campos con valores por defecto
    const currentListRef = doc(db, 'planners', 'defaultPlanner', 'currentList', 'current')
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
    const savedListRef = doc(db, 'planners', 'defaultPlanner', 'savedLists', savedListId)
    const savedListSnap = await getDoc(savedListRef)

    if (savedListSnap.exists()) {
      const savedListData = savedListSnap.data()
      const currentListRef = doc(db, 'planners', 'defaultPlanner', 'currentList', 'current')

      await updateDoc(currentListRef, {
        ...savedListData,
        isCurrent: true,
        lastUpdate: serverTimestamp()
      })
      console.log('Lista actual cambiada por la lista guardada:', savedListId)
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
    const savedListRef = doc(db, 'planners', 'defaultPlanner', 'savedLists', savedListId)

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
    const savedListsRef = collection(db, 'planners', 'defaultPlanner', 'savedLists')
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