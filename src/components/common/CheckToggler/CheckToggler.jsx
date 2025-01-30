/**
 * CheckToggler component renders a checkbox with an optional conditional input and button.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.labelText - The text for the label associated with the checkbox.
 * @param {string} props.id - The id for the checkbox input.
 * @param {string} props.conditionalInputType - The type of the conditional input field.
 * @param {string} props.conditionalPlaceholder - The placeholder text for the conditional input field.
 * @param {string} props.conditionalButtonLabel - The label text for the conditional button.
 * @param {function} props.onChange - The function to call when the value of the conditional input changes.
 * @param {number} [props.min] - The minimum value for the conditional input field (optional).
 * @param {number} [props.max] - The maximum value for the conditional input field (optional).
 *
 * @returns {JSX.Element} The rendered CheckToggler component.
 */
import { useState } from 'react'
import { Label, Button, Input } from '../'

function CheckToggler({
  labelText, 
  id, 
  conditionalInputType, 
  conditionalPlaceholder, 
  conditionalButtonLabel, 
  onChange, 
  min, 
  max
}) {
  
  const [isChecked, setIsChecked] = useState(false)
  
  const onChangeHandler = (e) => {
    onChange(e.target.value) // Autoaplica los cambios en la pieza de estado onChange
  }

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
            onChange={() => setIsChecked(!isChecked)}/>
      </Label>
      
      {isChecked && (
        <>
          <Input
            id={`${id}Contidional`} 
            type={conditionalInputType}
            placeholder={conditionalPlaceholder}
            min={min || 0}
            max={max}
            onChange={onChangeHandler}/>

          {conditionalButtonLabel &&
          <Button 
            onClick={onClickHandler} 
            text={conditionalButtonLabel}/>}
        </>
        )
      } 
    </>
  )
}

export default CheckToggler