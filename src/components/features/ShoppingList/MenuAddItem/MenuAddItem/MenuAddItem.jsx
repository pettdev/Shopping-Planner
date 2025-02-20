import { useState, useEffect } from "react"
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

  const toggleShowForm = () => setShowMenu(!showMenu);

  const reset = () => {
    setQuantity('')
    setPrice('')
    updateItem({})
  }

  const handleNumberChange = (e, setStateFn) => {
    // Permitir decimales y borrado completo
    e.preventDefault
    const value = e.target.value
    const getSanitizedOfdValue = validator.getSanitizedOf(value)
    setStateFn(getSanitizedOfdValue)
  }

  const handleOperation = (mode) => {
    const num = parseFloat(quantity) || 0;
    const getSanitizedOfdNum = parseFloat(validator.getSanitizedOf(num) || '0');
    let newValue;
  
    switch (mode) {
      case '+':
        newValue = getSanitizedOfdNum + 1;
        break;
      case '-':
        newValue = Math.max(0, getSanitizedOfdNum - 1); // Asegura que no sea negativo
        break;
      default:
        console.warn(`handleOperation llamada con modo inválido: ${mode}`);
        return; // Salir de la función si el modo no es válido
    }
    setQuantity(newValue.toFixed(2));
  }


  // Al hacer clic en Agregar
  const handleSubmit = (e) => {
    e.preventDefault();
    const subtotal = (quantity * price).toFixed(2);

    try {
      updateList({ ...item, quantity, price, subtotal });
      updateTotal(subtotal); // Actualizar total solo si la lista se actualiza exitosamente
      toggleShowForm(); // Cerrar el formulario solo si la lista se actualiza exitosamente
      reset(); // Resetear el formulario solo si la lista se actualiza exitosamente

    } catch (error) {
      if (error.message === 'Item ya existe en la lista') {
        alert("Ya existe un producto con el mismo nombre."); // O usar un estado para mostrar el error
      }
    }
}
  
  return (
    <>
      {showMenu ? (
        <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
          <InputSearcher/>

          <br/>

          <Input
            required
            type={'text'}
            inputMode={'decimal'}
            id='quantity'
            labelText='Cantidad:'
            placeholder='Ej: 1.5'
            value={quantity}
            onChange={e => handleNumberChange(e, setQuantity)}/>

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
            id='price'
            labelText='Precio:'
            placeholder='Ej: 3.99'
            value={price}
            onChange={e => handleNumberChange(e, setPrice)}/>

          <br/>

          {/* PREVISUALIZAR MONTO */}
          <PreviewTotal quantity={quantity} price={price}/>

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