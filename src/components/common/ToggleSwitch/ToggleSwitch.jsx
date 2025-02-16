import { useEffect, useState } from 'react'
import './ToggleSwitch.css'

const ToggleSwitch = ({ label, onChange, checked = false }) => {
  const [on, setOn] = useState(checked)

  // Actualizamos el estado interno si la prop "checked" cambia
  useEffect(() => {
    setOn(checked)
  }, [checked])

  const onClickHandler = () => {
    setOn(prev => !prev)
  }

  useEffect(() => {
    try {
      onChange(on)
    } catch {
      console.error('onChange function not found.')
    }
  }, [on])

  return (
    <div className='toggleSwitch' onClick={onClickHandler}>
      {label}
      <div className={on ? 'baseOn' : 'base'}>
        <div className={`lever ${on ? 'leverOn' : 'leverOff'}`}></div>
      </div>
    </div>
  )
}

export default ToggleSwitch
