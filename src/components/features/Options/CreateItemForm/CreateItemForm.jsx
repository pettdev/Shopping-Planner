import { useState } from "react";
import { Input, SelectOption, Button } from "../../../common";
import { categories, weightUnits } from "../../../../data";
import ItemBody from "./ItemBody";
import { addGlobalItem } from "../../../../utils/globalItemsUtils";
import StateValidator from "../../../../utils/StateValidator";


const CreateItemForm = () => {
  // Estado para controlar la visibilidad del formulario
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    brand: '',
    netWeight: '',
    weightUnit: '',
  });


  //Builds the item object with the object's state properties
  const itemBody = new ItemBody();

  // Crea un validador de campos de estado
  const validator = new StateValidator()




  // Manejar cambios en los campos de entrada
  const handleChange = (e) => {
    e.preventDefault();
    const { value, id } = e.target;
    
    // Validar y aplicar cambios en netWeight específicamente
    if (id === 'netWeight') {
      const sanitizedValue = validator.sanitize(String(value).toLowerCase());
      if (sanitizedValue !== undefined) {
        setFormData(prev => ({ ...prev, [id]: sanitizedValue }));
      } else {
        e.target.value = ''; // Immediate feedback for invalid input
      }
      return;
    }
    
    // Aplicar cambios en el resto de los campos
    setFormData(prev => ({ ...prev, [id]: value }));
  };


  // Reseteador
  const resetFormData = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      brand: '',
      netWeight: '',
      weightUnit: '',
    });
  }


  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Make sure these fields are filled 
    if (formData.name &&
        formData.category &&
        formData.netWeight && 
        formData.weightUnit) {

      // build() es para construir el item con las propiedades de formData
      const item = itemBody.build(formData);

      // Agregar item fabricado para globalItems en la base de datos de Firestore
      addGlobalItem(item)
      resetFormData()
      setShowForm(false);
    }
  };


  // Extraer nombres de categorías de los datos
  const allCategories = categories.categories.map((category) => category.name);
  
  // Extraer unidades de los datos
  const allWeightUnits = weightUnits.units.map((unit) => unit.representation);


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
            onChange={handleChange}/>
          <br/>
          <Input
            
            labelText="Descripción:"
            type="textarea" 
            id="description" 
            placeholder="Breve descripción"
            onChange={handleChange}/>
          <br/>
          <Input
            labelText="Marca:"
            type="text"
            id="brand"
            placeholder="Luxor, Nestlé, SuperLíder"
            onChange={handleChange}/>
          <br/>
          <SelectOption
            required
            labelText="Categoría:"
            id="category"
            options={allCategories}
            onChange={handleChange}/>
          <br/>
          <Input
            required
            labelText="Peso neto:"
            type="number"
            min={1}
            id="netWeight"
            placeholder="Cantidad de peso neto"
            onChange={handleChange}/>
          <br/>
          <SelectOption
            required
            labelText="Unidad de peso:"
            id="weightUnit"
            options={allWeightUnits}
            onChange={handleChange}/>
          <br/>
          <Button type="submit" text="Crear"/>
          <Button text="X" onClick={() => setShowForm(false)}/>
        </form>
      ) : (
        <Button text="Crear producto nuevo" onClick={() => setShowForm(true)} />
      )}
    </>
  );
};

export default CreateItemForm;