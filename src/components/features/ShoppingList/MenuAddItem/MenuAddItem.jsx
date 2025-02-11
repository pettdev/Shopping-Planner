import { useState } from "react";
import { Input, Button } from "../../../common";
import StateValidator from "../../../../utils/StateValidator";
import ProductTotal from "./ProductTotal";
import InputSearcher from "./InputSearcher/InputSearcher";

const MenuAddItem = () => {
  
  // Estados para agregar items existentes en un Menú
  const [showMenu, setShowMenu] = useState(false)
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("")

  
  // Toggler para abrir o cerrar menú
  const toggleShowForm = () => setShowMenu(!showMenu);
  
  // Reset react state fields
  const reset = () => {
    setQuantity('')
    setPrice('')
  }

  // Clase usada para validar cantidades en un 
  // input al ser invocado por un evento Click
  const validator = new StateValidator

  const validate = (value, setStateFn) => {
    const sanitizedValue = validator.sanitize(value)
    setStateFn(sanitizedValue)
  }


  const newItemInputProps = {
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
          toggleShowForm()}}>

          <InputSearcher/>

          <br/>

          {/* CANTIDAD */}
          <Input
            required
            type={'number'}
            id={newItemInputProps.quantity.id}
            labelText={newItemInputProps.quantity.label}
            placeholder={newItemInputProps.quantity.placeholder}
            value={quantity}
            onChange={e => validate(e.target.value, setQuantity)}/>

          {/* BOTÓN PARA DISMINUIR CANTIDAD EN 1 */}
          <Button 
            text={'-'} 
            onClick={() => {
              const num = parseFloat(quantity) || 0;
              setQuantity(Math.max(0, num - 1).toFixed(2));
            }}/>


          {/* BOTÓN PARA AUMENTAR CANTIDAD EN 1 */}
          <Button 
            text={'+'} 
            onClick={() => {
              const num = parseFloat(quantity) || 0;
              setQuantity((num + 1).toFixed(2));
            }}/>
          
          <br/>
          
          {/* PRECIO */}
          <Input
            required
            type={'number'}
            id={newItemInputProps.pricing.id}
            labelText={newItemInputProps.pricing.label}
            placeholder={newItemInputProps.pricing.placeholder}
            value={price}
            onChange={e => validate(e.target.value, setPrice)}/>

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
              reset()}}/>
              
      </form>) : (

      <Button
        text={'+'} 
        onClick={toggleShowForm}/>
      )}
    </>
  )
}

export default MenuAddItem