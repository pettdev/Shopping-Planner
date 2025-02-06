import { useState } from "react";
import { Input, Button } from "../../../common";
import StateValidator from "../../../../utils/StateValidator";
import ProductTotal from "./ProductTotal";

const AddItemMenu = () => {
  
  const [showMenu, setShowMenu] = useState(false)
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("")
  const [items, setItems] = useState(null)
  const toggleShowForm = () => setShowMenu(!showMenu);
  
  // Reset react state fields
  const useReset = () => {
    setQuantity('')
    setPrice('')
  }

  // Clase usada para validar cantidades en un input al ser invocado por un evento Click
  const handleQuantityChange = new StateValidator
  const handlePriceChange = new StateValidator

  const newItem = {
    name: {
      id: 'name',
      label: 'Nombre:',
      placeholder: 'Escribe un producto'
    },
    quantity: {
      id: 'quantity',
      label: 'Cantidad:',
      placeholder: 'Ingresa una cantidad'
    },
    pricing: {
      id: 'price',
      label: 'Precio:',
      placeholder: 'Escribe su precio'
    }
  }

  return (
    <>
      {showMenu ? (
        <form onSubmit={(e) => {
          e.preventDefault()
          toggleShowForm()
          }}>

          {/* NOMBRE DEL PRODUCTO */}
          <Input
            required
            type={'text'}
            id={newItem.name.id}
            labelText={newItem.name.label}
            placeholder={newItem.name.placeholder}/>

          <br/>

          {/* CANTIDAD */}
          <Input
            required
            type={'text'}
            id={newItem.quantity.id}
            labelText={newItem.quantity.label}
            placeholder={newItem.quantity.placeholder}
            value={quantity}
            onChange={(e) => handleQuantityChange.run(e.target.value, setQuantity)}/>

          <Button 
            text={'-'} 
            onClick={() => {
              const num = parseFloat(quantity) || 0;
              setQuantity(Math.max(0, num - 1).toFixed(2));  // Redondea a 2 decimales
            }}/>

          <Button 
            text={'+'} 
            onClick={() => {
              const num = parseFloat(quantity) || 0;
              setQuantity((num + 1).toFixed(2));  // Redondea a 2 decimales
            }}/>

          <br/>

          {/* PRECIO */}
          <Input
            required
            type={'text'}
            id={newItem.pricing.id}
            labelText={newItem.pricing.label}
            placeholder={newItem.pricing.placeholder}
            value={price}
            onChange={e => handlePriceChange.run(e.target.value, setPrice)}/>

          <br/>

          {/* PREVISUALIZAR MONTO */}
          <ProductTotal quantity={quantity} price={price}/>

          <br/>
          
          {/* ENVIAR DATOS */}
          <Button
            type={'submit'}
            text={'Agregar'}/>

          {/* CERRAR */}
          <Button
            text={'X'}
            onClick={()=>{
              toggleShowForm()
              useReset()}}/>
              
      </form>) : (

      <Button
        text={'+'} 
        onClick={toggleShowForm}/>
      )}
    </>
  )
}

export default AddItemMenu