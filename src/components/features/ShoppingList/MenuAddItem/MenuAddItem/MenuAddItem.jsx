import './MenuAddItem.css'
import { useState } from "react"
import { useItemsList, useSelectedItem, useTotal } from "../../../../../context"
import { Input, Button } from "../../../../common"
import DecimalInputSanitizer from "../../../../../utils/DecimalInputSanitizer"
import PreviewTotal from "./helpers/PreviewTotal"
import InputSearcher from "../InputSearcher/InputSearcher"

const MenuAddItem = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")

  // Item seleccionado del buscador
  const { item, updateItem } = useSelectedItem()
  // Lista de items agregadas al planner
  const { updateList } = useItemsList()
  // Actualiza el total de toda la lista
  const { updateTotal } = useTotal()
  // Validador de campos numericos con estado
  const validator = new DecimalInputSanitizer()

  const toggleShowForm = () => setShowMenu(!showMenu)

  const resetFields = () => {
    setQuantity('')
    setPrice('')
    updateItem({})
  }

  const handleNumberChange = (e, setStateFn) => {
    e.preventDefault
    const value = e.target.value
    const sanitizedValue = validator.getSanitizedOf(value)
    setStateFn(sanitizedValue)
  }

  const handleOperation = (mode) => {
    const num = parseFloat(quantity) || 0
    const sanitizedQuantity = parseFloat(validator.getSanitizedOf(num) || '0')
    let newValue
  
    switch (mode) {
      case '+':
        newValue = sanitizedQuantity + 1
        break
      case '-':
        newValue = Math.max(0, sanitizedQuantity - 1) // Asegura que no sea negativo
        break
      default:
        console.warn(`handleOperation llamada con modo inválido: ${mode}`)
        return // Salir de la función si el modo no es válido
    }
    setQuantity(newValue.toFixed(2))
  }

  // Al hacer clic en Agregar
  const handleSubmit = (e) => {
    e.preventDefault()
    const subtotal = quantity * price
    
    try {
      updateList({...item, quantity, price, subtotal})
      updateTotal(subtotal)
      toggleShowForm()
      resetFields()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      {showMenu ? (
        <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
          <InputSearcher/>

        <div className='quantityContainer'>

          {/* CANTIDAD */}
          <Input
            className='quantityInput'
            required
            labelText='Cantidad'
            type={'text'}
            inputMode={'decimal'}
            placeholder='Ej.: 1.50'
            value={quantity}
            onChange={e => handleNumberChange(e, setQuantity)}/>

          <div className='buttonsContainer'>
            {/* BOTÓN DISMINUIR EN 1 */}
            <Button 
              className='minusButton'
              text={'-'} 
              onClick={() => handleOperation('-')}/>

            {/* BOTÓN AUMENTAR EN 1 */}
            <Button 
              className='plusButton'
              text={'+'} 
              onClick={() => handleOperation('+')}/>
          </div>
        </div>

          
          {/* PRECIO */}
          <Input
            className='priceInput'
            required
            labelText='Precio'
            type={'text'}
            inputMode={'decimal'}
            placeholder='Ej: 3.99'
            value={price}
            onChange={e => handleNumberChange(e, setPrice)}/>

          {/* PREVISUALIZAR MONTO */}
          <PreviewTotal 
            quantity={quantity} 
            price={price}/>
          
          {/* ENVIAR DATOS */}
          <Button
            type={'submit'}
            text={'Agregar'}/>

          {/* CERRAR */}
          <Button
            className='cancelButton'
            text={'Cancelar'}
            onClick={()=>{
              toggleShowForm()
              resetFields()}}/>
        </form>
      ) : (
        <Button text={'Agregar a la lista'} onClick={toggleShowForm} className='addToListButton'/>
      )}
    </>
  )
}

export default MenuAddItem