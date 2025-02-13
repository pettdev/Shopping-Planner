import { useState, useEffect } from "react"
import { useItemsList } from "../../../../../context/ItemsListContext"
import { useSelectedItem } from "../../../../../context/SelectedItemContext"
import { useTotal } from "../../../../../context/TotalContext"
import { Input, Button } from "../../../../common"
import StateValidator from "../../../../../utils/StateValidator"
import PreviewTotal from "./helpers/PreviewTotal"
import InputSearcher from "../InputSearcher/InputSearcher"

const MenuAddItem = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")

  // Item seleccionado del buscador
  const { item, updateItem } = useSelectedItem()
  // Lista de items agregadas al planner
  const { list, updateList } = useItemsList()
  // Actualiza el total de toda la lista
  const { updateTotal } = useTotal() 

  // Validador de campos numericos con estado
  const validator = new StateValidator()

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
    const subtotal = quantity * price
    updateList(
      // AGREGAR ITEM A LA LISTA
      {...item, quantity, price, subtotal: subtotal})
    // Acumular (sumar) subtotales
    updateTotal(subtotal)
    //Vaciar campos
    reset()
  }

  useEffect(()=>{
    console.log('Desde MenuAddItem.jsx, contexto list:', list)
  }, [list])

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