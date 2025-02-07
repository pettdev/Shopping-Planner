/**
 * SelectOption component renders a labeled select dropdown with options.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.id - The id for the select element and label.
 * @param {string} props.labelText - The text for the label.
 * @param {Array} props.options - Array of display texts for the select options.
 * @returns {JSX.Element} The rendered SelectOption component.
 */
import {Label} from ".."

const SelectOption = ({id, labelText, options, ...props}) => {

  const formattedOption = (option) => String(option).toLowerCase().replace(/ /g, '_')
  const defaultValue = props.defaultValue ? props.defaultValue : 'Seleccionar opción'

  return (
    <Label htmlFor={id} labelText={labelText}>

      <select id={id} defaultValue={defaultValue} {...props}>

          <option key={'default'} value={defaultValue} disabled >
            {defaultValue}
          </option>

        {options.map((option) => (
          <option 
            key={formattedOption(option)} 
            value={formattedOption(option)}>
              {option}
          </option>
        ))}

      </select>
    </Label>
  )
}

export default SelectOption