import React from 'react'
import MenuAddItem from "./MenuAddItem/MenuAddItem/MenuAddItem"
import ItemList from "./MenuAddItem/ItemList"
import { initializeShoppingPlanner } from '../../../utils'

function ShoppingList() {

  initializeShoppingPlanner()

  return (
    <>
      <ItemList />
      <MenuAddItem />
    </>
  )
}

export default ShoppingList
