import { useState, useEffect } from "react";
import { Input, SelectOption, Button } from "../../../common";
import { categories, units } from "../../../../data";
import ItemFactory from "./ItemFactory";

const CreateItemForm = () => {

  
  // Estado para controlar la visibilidad del formulario
  const [showForm, setShowForm] = useState(false);
  

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    selected_category: '',
    selected_unit: '',
  });

  const factory = new ItemFactory({ ...formData });

  // Manejar cambios en los campos de entrada
  const handleChange = (e) => {
    
    if(e.target.id === 'exempt') {
      setFormData({...formData, [e.target.id]: e.target.checked})
    } else {
      setFormData({...formData, [e.target.id]: e.target.value})
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData))
    
    if (formData.name && 
        formData.selected_unit && 
        formData.selected_category) {
      factory.build()
      setShowForm(false);
    }
  };

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
            required
            labelText="Categoría:"
            id="selected_category"
            options={allCategories}
            onChange={handleChange}
          />
          <br/>
          <SelectOption
            required
            labelText="Unidad:"
            id="selected_unit"
            options={allSellingUnits}
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