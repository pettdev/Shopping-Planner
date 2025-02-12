import { useState } from "react"
import { Input, Button } from "../../../common"
import StateValidator from "../../../../utils/StateValidator"
import ProductTotal from "./ProductTotal"
import InputSearcher from "./InputSearcher/InputSearcher"
import { useItemsList } from "../../../../context/ItemsListContext"

const MenuAddItem = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const {list, updateList} = useItemsList()

  const validator = new StateValidator()

  const toggleShowForm = () => setShowMenu(!showMenu);

  const reset = () => {
    setQuantity('')
    setPrice('')
  }

  const handleNumberChange = (value, setStateFn) => {
    // Permitir decimales y borrado completo
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setStateFn(value)
    }
  }

  const handleOperation = (mode) => {
    const num = parseFloat(quantity) || 0;
    const sanitizedNum = parseFloat(validator.sanitize(num) || '0');
    let newValue;
  
    switch (mode) {
      case '+':
        newValue = sanitizedNum + 1;
        break;
      case '-':
        newValue = Math.max(0, sanitizedNum - 1); // Asegura que no sea negativo
        break;
      default:
        console.warn(`handleOperation llamada con modo inválido: ${mode}`);
        return; // Salir de la función si el modo no es válido
    }
    setQuantity(newValue.toFixed(2));
  }

  // Al hacer clic en Agregar
  const handleSubmit = (e) => {
    e.preventDefault()
    toggleShowForm()

    
  }

  const newItemInputProps = {
    quantity: {
      id: 'quantity',
      label: 'Cantidad:',
      placeholder: 'Ej: 1.5'
    },
    pricing: {
      id: 'price',
      label: 'Precio:',
      placeholder: 'Ej: 3.99'
    }
  };

  return (
    <>
      {showMenu ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputSearcher/>

          <br/>

          <Input
            required
            type={'text'}
            inputMode={'decimal'}
            id={newItemInputProps.quantity.id}
            labelText={newItemInputProps.quantity.label}
            placeholder={newItemInputProps.quantity.placeholder}
            value={quantity}
            onChange={e => handleNumberChange(e.target.value, setQuantity)}/>

          {/* BOTÓN DISMINUIR EN 1 */}
          <Button 
            text={'-'} 
            onClick={() => handleOperation('-')}/>

          {/* BOTÓN AUMENTAR EN 1 */}
          <Button 
            text={'+'} 
            onClick={() => handleOperation('+')}/>
          
          <br/>
          
          {/* PRECIO */}
          <Input
            required
            type={'text'}
            inputMode={'decimal'}
            id={newItemInputProps.pricing.id}
            labelText={newItemInputProps.pricing.label}
            placeholder={newItemInputProps.pricing.placeholder}
            value={price}
            onChange={e => handleNumberChange(e.target.value, setPrice)}/>

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
              
              </form>
      ) : (
        <Button text={'+'} onClick={toggleShowForm}/>
      )}
    </>
  );
};

export default MenuAddItem;