import Item from '../Item/Item'

const ItemList = (items) => {

  return (
    <ul>
      {items.map(item => 
        <Item item={item}/>
      )}
    </ul>
  )
}

export default ItemList