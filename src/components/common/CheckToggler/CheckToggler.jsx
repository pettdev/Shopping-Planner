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
  conditionalValue,
  conditionalOnClick,
  min,
  max,
  children,
  ...props
}) {
  
  const [isChecked, setIsChecked] = useState(false)
  
  // Manejador de cambio para el input condicional
  const onChangeHandler = (e) => {
    const rawValue = e.target.value
    console.log('rawValue desde CheckToggler:', rawValue)
    conditionalOnChange(rawValue)
  }

  // Manejador de clic para el botón condicional
  const onClickHandler = (e) => {
    e.preventDefault()
    conditionalOnClick()
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
            id={`${id}_conditional`} 
            value={conditionalValue}
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