import { useState, useEffect } from "react"

/**
 * Component to calculate and display the total price of a product based on its quantity and unit price.
 *
 * @param {string|number} props.quantity - The quantity of the product.
 * @param {string|number} props.price - The unit price of the product.
 * @returns {JSX.Element} The JSX element displaying the total price.
 */
const ProductTotal = ({quantity, price}) => {
  // Estado para almacenar el precio total
  const [total, setTotal] = useState('0')

  useEffect(()=>{
    // Función para calcular el precio total
    const getTotal = (quantity, price) => {
      quantity = parseFloat(quantity)
      price = parseFloat(price)
  
      // Verificar si quantity o price no son números válidos
      if (isNaN(quantity) || isNaN(price)) {
        return '0';
      }
  
      // Calcular y devolver el precio total con dos decimales
      return (quantity * price).toFixed(2);     
    }
    
    // Actualizar el estado con el precio total calculado
    setTotal(getTotal(quantity, price))

  },[quantity, price])

  // Renderizar el precio total
  return (
    <span>Precio total: {total}</span>
  )
}

export default ProductTotal