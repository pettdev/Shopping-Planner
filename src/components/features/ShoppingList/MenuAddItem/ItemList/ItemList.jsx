import './ItemList.css'
import Item from '../Item'
import {useCurrency, useItemsList, useTotal} from '../../../../../context'
import { saveList, updateList } from '../../../../../utils'
import { useEffect } from 'react'

const ItemList = () => {
  const {convertedTotal, total} = useTotal()
  const {list} = useItemsList()
  const {currency} = useCurrency()

  useEffect(() => {
    updateList({list, total})
  }, [list, total])

  return (
    <div className='listContainer'>
      {list.map(item => 
        <Item 
          key={item.id} 
          item={item} 
          currency={currency}/>
      )}
      {total > 0 && (
        <>
        <div className=''>
          Total: {convertedTotal.toFixed(2)} {currency.symbol}
        </div>
        </>
      )}
    </div>
  )
}

export default ItemList