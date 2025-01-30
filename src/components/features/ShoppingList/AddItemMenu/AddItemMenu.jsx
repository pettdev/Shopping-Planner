import { useState } from "react";
import { Input, Button } from "../../../common";

const AddItemMenu = () => {
  
  const [showMenu, setShowMenu] = useState(false)
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("")
  const toggleShowForm = () => setShowMenu(!showMenu);
  
  const resetter = () => {
    setQuantity('')
    setPrice('')
  }

  const handleQuantityChange = (value) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setQuantity(value);
    }
  };

  const handlePriceChange = (value) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  const previewTotal = () => {
    const parsedQuantity = parseFloat(quantity);
    const parsedPrice = parseFloat(price);

    if (isNaN(parsedQuantity) || isNaN(parsedPrice)) {
      return '0';
    }

    return (parsedQuantity * parsedPrice).toFixed(2);
  }

  
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
            onChange={(e) => handleQuantityChange(e.target.value)}/>

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
            onChange={e => handlePriceChange(e.target.value)}/>

          <br/>

          {/* PREVISUALIZAR MONTO */}
          <span>{`Preview: ${previewTotal()}`}</span>
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
              resetter()}}/>
              
      </form>) : (

      <Button
        text={'+'} 
        onClick={toggleShowForm}/>
      )}

    </>
  )
}

export default AddItemMenu