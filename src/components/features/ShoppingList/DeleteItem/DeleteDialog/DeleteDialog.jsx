import {useRef, useState} from "react"
import {Button, Dialog} from "../../../../common"
import {useItemsList} from "../../../../../context"

const DeleteDialog = ({item, openState}) => {
  const {list, setList} = useItemsList()
  const lastDeletedItemId = useRef(null)

  const filteredList = () => {
    if (item.id === lastDeletedItemId.current) return
    lastDeletedItemId.current = item.id
    const newList = list.reduce((acc, currentItem) => {
      if (currentItem.id !== item.id) {
        acc.push(currentItem)
      }
      return acc
    }, [])
    return newList
  }
  
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setList(filteredList())
  }
  
  return (
    <>
      <Dialog openState={openState}>
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <p>¿Eliminar <b>{`${item.name}`}</b> de la lista?</p>
          <div className="button-container">
            <Button type="onSubmit" text='Confirmar'/>
            <Button text='Cancelar' onClick={() => openState(false)} autoFocus/>
          </div>
        </form>
      </Dialog>
    </>
  )
}

export default DeleteDialog