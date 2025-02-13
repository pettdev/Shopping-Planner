import './ItemList.css'
import Item from '../Item'
import { useItemsList } from '../../../../../context/ItemsListContext'
import { useTotal } from '../../../../../context/TotalContext'

const ItemList = () => {
  const {list} = useItemsList()
  const {total} = useTotal()
  
  return (
    <>
      <div className='listContainer'>
        {list.map(item => 
          <Item key={item.id} item={item}/>
        )}
      {total > 0 && (
        <div className='grid_item total'>
          Total: {total}
        </div>
      )}
      </div>
    </>
  )
}

export default ItemList