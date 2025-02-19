import './ItemList.css'
import Item from '../Item'
import { useCurrency, useDollarRate, useItemsList, useTotal } from '../../../../../context'


const ItemList = () => {
  const {total} = useTotal()
  const {list} = useItemsList()
  const {currency} = useCurrency()
  const {rate} = useDollarRate()
  const totalConverted = (rate ? total / rate : total).toFixed(2)
  console.log('selected:', currency)
  
  return (
    <>
      <div className='listContainer'>
        {list.map(item => 
          <Item key={item.id} item={item} currencySymbol={currency.symbol} currencyRate={rate}/>
        )}
      {total > 0 && (
        <div className='grid_item total'>
          Total: {totalConverted} {currency.symbol}
        </div>  
      )}
      </div>
    </>
  )
}

export default ItemList