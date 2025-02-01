import { useState, useEffect } from "react";
import { Input, SelectOption, Button, CheckToggler } from "../../../common";
import { categories, units } from "../../../../data";
import { useCreatedItemContext } from "../../../../context/CreateItemContext/";
import { itemFactory } from "../itemFactory";

const CreateItemForm = () => {
  // Obtener la función de actualización del contexto
  const { formData, updateFormData } = useCreatedItemContext();
  
  // Estado para controlar la visibilidad del formulario
  const [showForm, setShowForm] = useState(false);
  
  // Estado para almacenar los datos temporales del formulario
  const [tempData, setTempData] = useState({
    name: '',
    description: '',
    brand: '',
    selected_category: '',
    selected_unit: '',
    exempt:''
  });

  //console.log(itemFactory(tempData.brand, ))

  // Manejar cambios en los campos de entrada
  const handleChange = (e) => {
    
    if(e.target.id === 'exempt') {
      setTempData({...tempData, [e.target.id]: e.target.checked})
    } else {
      setTempData({...tempData, [e.target.id]: e.target.value})
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tempData.name && tempData.description) {
      console.log(`sent tempData: ${JSON.stringify(tempData)}`)
      updateFormData(tempData); // Actualizar datos en el contexto
      console.log(`saved updateFormData: ${JSON.stringify(formData)}`)
      setShowForm(false); // Ocultar formulario tras enviar
    }
  };

  // En otro lugar del componente:
  useEffect(() => {
  console.log("formData actualizado:", formData); // ✅ Valor nuevo
  }, [formData]);

  // Extraer nombres de categorías de los datos
  const allCategories = categories.categories.map((category) => category.name);
  
  // Extraer unidades de los datos
  const allSellingUnits = units.units.map((unit) => unit.represented);

  return (
    <>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <Input 
            required
            labelText="Nombre:"
            type="text" 
            id="name" 
            placeholder="Nombre del producto" 
            onChange={handleChange}
          />
          <br/>
          <Input
            required
            labelText="Descripción:"
            type="textarea" 
            id="description" 
            placeholder="Breve descripción"
            onChange={handleChange}
          />
          <br/>
          <Input
            labelText="Marca:"
            type="text"
            id="brand"
            placeholder="Luxor, Nestlé, SuperLíder"
            onChange={handleChange}
          />
          <br/>
          <SelectOption
            labelText="Categoría:"
            id="selected_category"
            options={allCategories}
            onChange={handleChange}
          />
          <br/>
          <SelectOption
            labelText="Unidad:"
            id="selected_unit"
            options={allSellingUnits}
            onChange={handleChange}
          />
          <br/>
          <CheckToggler 
            labelText={'Exento de impuestos:'}
            id='exempt'
            onChange={handleChange}
          />
          <br/>
          <Button type="submit" text="Crear" />
          <Button text="X" onClick={() => setShowForm(false)} />
        </form>
      ) : (
        <Button text="Crear nuevo producto" onClick={() => setShowForm(true)} />
      )}
    </>
  );
};

export default CreateItemForm;