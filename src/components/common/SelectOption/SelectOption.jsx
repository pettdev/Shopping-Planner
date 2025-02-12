import {Label} from ".."

const SelectOption = ({id, labelText, options, value, ...props}) => {
  return (
    <Label htmlFor={id} labelText={labelText}>
      <select 
        id={id} 
        value={value || ""} 
        {...props}
      >
        <option value="" disabled>Seleccionar opción</option>
        {options.map((option) => (
          <option 
            key={option} 
            value={option} // Usar valor original sin formatear
          >
            {option}
          </option>
        ))}
      </select>
    </Label>
  );
};

export default SelectOption