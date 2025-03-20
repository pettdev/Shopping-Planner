import React from 'react'
import { saveList } from '../../../../utils'
import { useTotal } from '../../../../context'

const SaveListButton = () => {
  const { total } = useTotal()

  const handleSaveList = async () => {
    try {
      // Pasar el valor total actual al guardar la lista
      await saveList(total)
    } catch (error) {
      console.error('Error al guardar la lista:', error)
    }
  }

  return (
    <button 
      onClick={handleSaveList}
      className="save-list-button"
    >
      Guardar Lista
    </button>
  )
}

export default SaveListButton