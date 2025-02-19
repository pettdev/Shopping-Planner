/*
* API de pyDolarVenezuela API
* Repositorio: https://github.com/fcoagz/api-pydolarvenezuela
*/
const BASE = 'https://pydolarve.org'
const BCV_ENDPOINT = 'api/v1/dollar?page=bcv'
const ENPARALELOVENEZUELA_ENDPOINT = 'api/v1/dollar?page=enparalelovzla'

export const getBCV = async () => {
  try {
    const response = await fetch(`${BASE}/${BCV_ENDPOINT}`) // fetch para la petición GET

    if(!response.ok) { // Manejar respuestas HTTP
      switch (response.status) {
        case 400:
          throw new Error("Error 400: Petición incorrecta")
        case 404:
          throw new Error("Error 404: Recurso no encontrado")
        case 500:
          throw new Error("Error 500: Error del servidor")
        default:
          console.error(`Error HTTP desconocido: ${response.status}`)
          throw new Error(`Error HTTP desconocido: ${response.status}`)
      }
    }
    const data = await response.json() // Convertir la respuesta a JSON
    const rate = data.monitors.usd.price
    return rate
    
  } catch (error) {
    throw error
  }
}


export const getParalelo = async () => {
  try {
    const response = await fetch(`${BASE}/${ENPARALELOVENEZUELA_ENDPOINT}`) // fetch para la petición GET

    if(!response.ok) { // Manejar respuestas HTTP
      switch (response.status) {
        case 400:
          throw new Error("Error 400: Petición incorrecta")
        case 404:
          throw new Error("Error 404: Recurso no encontrado")
        case 500:
          throw new Error("Error 500: Error del servidor")
        default:
          console.error(`Error HTTP desconocido: ${response.status}`)
          throw new Error(`Error HTTP desconocido: ${response.status}`)
      }
    }
    const data = await response.json() // Convertir la respuesta a JSON
    const rate = data.monitors.enparalelovzla.price
    return rate
    
  } catch (error) {
    throw error
  }
}