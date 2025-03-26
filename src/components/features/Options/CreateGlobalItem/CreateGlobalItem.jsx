import './CreateGlobalItem.css'
import { useState } from "react"
import { Input, SelectOption, Button } from "../../../common"
import { categories, weightUnits } from "../../../../data"
import ItemBody from "../CreateItemForm/ItemBody"
import { addGlobalItem } from "../../../../utils/globalItemsUtils"
import DecimalInputSanitizer from "../../../../utils/DecimalInputSanitizer"

export default function CreateGlobalItem() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    brand: '',
    netWeight: '',
    weightUnit: '',
  })

  // Configuración de unidades de peso
  const weightUnitOptions = weightUnits.units.map(unit => ({
    symbol: unit.symbol,
    representation: unit.representation
  }))

  // Configuración de categorías
  const categoryOptions = categories.categories.map(category => category.name)

  // Validador de campos numéricos
  const validator = new DecimalInputSanitizer()

  const handleChange = (e) => {
    const { value, id } = e.target
    
    if (id === 'netWeight') {
      const getSanitizedOfdValue = validator.getSanitizedOf(value)
      setFormData(prev => ({ 
        ...prev, 
        [id]: getSanitizedOfdValue || ''
      }))
      return
    }
    
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleUnitChange = (selectedRepresentation) => {
    const selectedUnit = weightUnitOptions.find(
      unit => unit.representation === selectedRepresentation
    )
    if (selectedUnit) {
      setFormData(prev => ({
        ...prev,
        weightUnit: selectedUnit.symbol
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name &&
        formData.category &&
        formData.netWeight &&
        formData.weightUnit) {
      const item = new ItemBody().build({
        ...formData,
        netWeight: parseFloat(formData.netWeight)
      })
      addGlobalItem(item)
      setShowForm(false)
      setFormData({
        name: '',
        category: '',
        description: '',
        brand: '',
        netWeight: '',
        weightUnit: '',
      })
    }
  }

  return (
    <>
      {showForm ? (
        <form onSubmit={handleSubmit} autoComplete="off" className='globalForm'>
          <Input 
            required
            labelText="Nombre"
            type="text" 
            id="name" 
            placeholder="Nombre del producto"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            labelText="Descripción"
            type="textarea" 
            id="description" 
            placeholder="Breve descripción del producto"
            value={formData.description}
            onChange={handleChange}
          />

          <Input
            labelText="Marca"
            type="text"
            id="brand"
            placeholder="Marca del producto"
            value={formData.brand}
            onChange={handleChange}
          />

          <SelectOption
            required
            labelText="Categoría"
            id="category"
            options={categoryOptions}
            value={formData.category}
            onChange={(e) => setFormData(prev => ({
              ...prev, 
              category: e.target.value
              }))
            }
          />

          <Input
            required
            labelText="Peso neto"
            type="number"
            step="0.01"
            min="0.01"
            id="netWeight"
            placeholder="0.00"
            value={formData.netWeight}
            onChange={handleChange}
          />

          <SelectOption
            required
            labelText="Unidad de peso"
            id="weightUnit"
            options={weightUnitOptions.map(unit => unit.representation)}
            value={weightUnitOptions.find(u => u.symbol === formData.weightUnit)?.representation || ''}
            onChange={(e) => handleUnitChange(e.target.value)}
          />

          <Button type="submit" text="Crear"/>
          <Button text="Cancelar" onClick={() => setShowForm(false)}/>
        </form>
      ) : (
        <Button className='globalButton' text="Crear producto global" onClick={() => setShowForm(true)} />
      )}
    </>
  )
}