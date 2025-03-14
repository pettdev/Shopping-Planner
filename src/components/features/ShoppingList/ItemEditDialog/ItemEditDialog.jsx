import './ItemEditDialog.css'
import { useState } from 'react'
import { Input, Button } from'../../../common'
import { useItemsList } from '../../../../context'

const ItemEditDialog = ({item}) => {

  const [showDialog, setShowDialog] = useState(false)
  const {updateList} = useItemsList()
  

  const onSubmitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className='grid_item' onClick={() => setShowDialog(prev => !prev)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="edit-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
      </div>

      {showDialog && (
        <div className='edit-dialog'>
          <form onSubmit={onSubmitHandler}>
            <p>{item.name} {item.netWeight} {item.weightUnit}</p>
            {item.brand && <p>{item.brand}</p>}
            {item.description && <p>{item.description}</p>}
            <p>{item.category}</p>
            <Input labelText='Cantidad'/>
            <Input labelText='Precio'/>
            <Button text='Guardar'/>
          </form>
        </div>
      )}
    </>
  )
}

export default ItemEditDialog