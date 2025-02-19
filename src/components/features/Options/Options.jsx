import React from 'react'
import { CreateItemForm } from "./CreateItemForm"
import { Budget } from './Budget'
import DollarRate from './DollarRateInput/DollarRate'

function Options() {
  return (
    <>
      <DollarRate/>
      <Budget />
      <CreateItemForm />
    </>
  )
}

export default Options
