/**
 * CheckToggler component that renders a checkbox with optional conditional input and button.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.labelText - The text for the label associated with the checkbox.
 * @param {string} props.id - The id for the checkbox input.
 * @param {string} props.conditionalInputType - The type of the conditional input field.
 * @param {string} props.conditionalPlaceholder - The placeholder text for the conditional input field.
 * @param {string} props.conditionalButtonLabel - The label text for the conditional button.
 * @param {boolean} props.renderOnCondition - Boolean to determine the rendering of conditional elements when the checkbox is checked.
 * @param {number} [props.min] - The minimum value for the conditional input field (optional).
 * @param {number} [props.max] - The maximum value for the conditional input field (optional).
 * @param {JSX.Element} props.children - The child elements to render when the checkbox is checked.
 *
 * @returns {JSX.Element} The rendered CheckToggler component.
 */
import { useState } from 'react'
import { Label, Button, Input } from '../'

function CheckToggler({
  labelText,
  id,
  renderOnCondition=false,
  conditionalInputType,
  conditionalPlaceholder,
  conditionalButtonLabel,
  conditionalOnChange,
  min,
  max,
  children,
  ...props
}) {
  
  const [isChecked, setIsChecked] = useState(false)
  
  // Manejador de cambio para el input condicional
  const onChangeHandler = (e) => {
    const rawValue = e.target.value
    console.log('value:', rawValue)
    conditionalOnChange(rawValue)
  }

  // Manejador de clic para el botón condicional
  const onClickHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Label htmlFor={id} labelText={labelText}>
        <Input 
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          {...props}/>
      </Label>
      
      {isChecked && renderOnCondition && (
        <>
          <Input
            id={`${id}Contidional`} 
            type={conditionalInputType}
            placeholder={conditionalPlaceholder}
            min={min || 0}
            max={max}
            onChange={onChangeHandler}
          />

          {conditionalButtonLabel && (
            <Button 
              onClick={onClickHandler} 
              text={conditionalButtonLabel}
            />
          )}
          {children}
        </>
      )}
    </>
  )
}

export default CheckToggler