import './ItemList.css'
import Item from '../Item'
import { useItemsList, useTotal } from '../../../../../context'

const ItemList = () => {

  const {total} = useTotal()
  const {list} = useItemsList()

  console.log('ItemList, total:', total)
  
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