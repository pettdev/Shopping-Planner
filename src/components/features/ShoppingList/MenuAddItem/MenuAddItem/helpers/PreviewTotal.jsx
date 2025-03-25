import { useState, useEffect } from "react"
import { useCurrency } from "../../../../../../context"

const PreviewTotal = ({quantity, price}) => {
  // Estado para almacenar el precio total
  const [total, setTotal] = useState('0')
  const { currency } = useCurrency()

  useEffect(()=>{
    // Función para calcular el precio total
    const getTotal = (quantity, price) => {
      quantity = parseFloat(quantity)
      price = parseFloat(price)
  
      // Verificar si quantity o price no son números válidos
      if (isNaN(quantity) || isNaN(price)) {
        return 0;
      }
  
      // Calcular y devolver el precio total con dos decimales
      return (quantity * price).toFixed(2);     
    }
    
    // Actualizar el estado con el precio total calculado
    setTotal(getTotal(quantity, price))

  },[quantity, price])

  return (
    <div className="previewTotalContainer">
      <p className="previewTotal">{currency.code} {total ? total : '0.00'}</p>
    </div>
  )
}

export default PreviewTotal