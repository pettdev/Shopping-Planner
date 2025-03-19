import { useState } from 'react'
import {Button, Dialog, Input} from "../../../../common"
import { DecimalInputSanitizer } from "../../../../../utils"
import { useItemsList } from '../../../../../context'

const EditDialog = ({item, openState}) => {
  const [formData, setFormData] = useState({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    netWeight: item.netWeight,
    weightUnit: item.weightUnit,
  })

  const sanitizer = new DecimalInputSanitizer()
  
  const handleChange = (e, field) => {
    let value = e.target.value
    
    if (field === 'quantity' || field === 'price') {
      value = sanitizer.getSanitizedOf(value)
    }
    
    setFormData(prev => ({...prev, [field]: value}))
  }

  const { updateList } = useItemsList()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    updateList({
      ...item,
      ...formData,
      quantity: parseFloat(formData.quantity),
      price: parseFloat(formData.price)
    })
    openState(false)
  }

  return (
    <Dialog openState={openState}>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <p><b>Editar producto</b></p>
        <p>{formData.name}, {formData.netWeight} {formData.weightUnit}</p>
        <p>Modifica la cantidad y el precio aquí. Pulsa "Guardar cambios" al finalizar.</p>
        <Input 
          labelText="Cantidad:" 
          value={formData.quantity}
          onChange={(e) => handleChange(e, 'quantity')}
          />
        <Input 
          labelText="Precio:" 
          value={formData.price}
          onChange={(e) => handleChange(e, 'price')}
          />
        <div className="button-container">
          <Button type="submit" text={'Guardar cambios'}/>
          <Button onClick={() => openState(false)} text={'Cancelar'}/>
        </div>
      </form>
    </Dialog>
  )
}

export default EditDialog