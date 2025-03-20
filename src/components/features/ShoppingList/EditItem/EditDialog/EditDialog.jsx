import {useState} from 'react'
import {Button, Dialog, Input} from "../../../../common"
import {DecimalInputSanitizer} from "../../../../../utils"
import {useItemsList, useTotal} from '../../../../../context'

const EditDialog = ({item, openState}) => {
  const {setList} = useItemsList()
  const {updateTotal} = useTotal()
  const [formData, setFormData] = useState({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    netWeight: item.netWeight,
    weightUnit: item.weightUnit,
    ...item
  })

  const sanitizer = new DecimalInputSanitizer()
  
  const handleChange = (e, field) => {
    let value = e.target.value
    if (field === 'quantity' || field === 'price') {
      value = sanitizer.getSanitizedOf(value)
    }
    setFormData(prev => ({...prev, [field]: value}))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const oldSubtotal = parseFloat((item.subtotal || 0).toFixed(2))
    const newQuantity = parseFloat(formData.quantity)
    const newPrice = parseFloat(formData.price)
    const newSubtotal = parseFloat((newQuantity * newPrice).toFixed(2))
    const updatedItem = {
      ...formData,
      quantity: newQuantity,
      price: newPrice,
      subtotal: newSubtotal
    }
    
    // Actualización atómica de lista y total
    setList(prevList => {
      const updatedList = prevList.map(listItem => 
        listItem.id === updatedItem.id ? updatedItem : listItem
      )
      updateTotal(parseFloat((newSubtotal - oldSubtotal).toFixed(2)))
      return updatedList
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
          required
          labelText="Cantidad:" 
          value={formData.quantity}
          onChange={(e) => handleChange(e, 'quantity')}
          />
        <Input
          required
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