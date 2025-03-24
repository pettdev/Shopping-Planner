import React from 'react'
import { Budget } from './Budget'
import DollarRate from './DollarRateInput/DollarRate'

function Options() {
  return (
    <div className='options'>
      <DollarRate/>
      <Budget />
    </div>
  )
}

export default Options
