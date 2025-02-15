import { useEffect, useState } from 'react'
import './ToggleSwitch.css'

const ToggleSwitch = ({label, onChange}) => {

  const [on, setOn] = useState(false)

  const onClickHandler = () => {
    setOn(!(on))
  }

  useEffect(() => {
    console.log(on ? 'on' : 'off')
    try {
      onChange(on)
    } catch {
      console.error('onChange function not found.')
    }
  },[on])

  return (
    <div className='toggleSwitch' onClick={onClickHandler}>
      {label}
      <div 
        className={on ? 'baseOn' : 'base'}>
        <div className={`lever ${on ? 'leverOn' : 'leverOff'}`}></div>
      </div>
    </div>
  )
}

export default ToggleSwitch