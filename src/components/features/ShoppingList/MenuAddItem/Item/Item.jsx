import './Item.css'
import { exchangeVESforUSD as exchanger } from '../../../../../context/CurrencyContext/helpers/exchangeVESforUSD'

function Item({ item, currency }) {
  const name = `${item.name}`
  const weight = `${item.netWeight} ${item.weightUnit}`
  const [bolivar, dollar] = exchanger.getPair()
  
  // Función de conversión optimizada
  const convert = (value) => {
    if (currency.isEqualTo(dollar)) {
      // Convertir a USD usando la tasa actual
      return dollar.convertToOwnCurrency(value).toFixed(2)
    } else if (currency.isEqualTo(bolivar)) {
      // Convertir a VES usando la tasa actual
      return value
    }
  }

  return (
    <>
      <div className="grid_container">

        <div className="itemInfo">

          <div className='name'>{`${name}, ${weight}`}</div>

          <div>
            <div className='itemDescription'>{item.description}</div>
            <div className='itemBrand'>{item.brand}</div>
          </div>

        </div>

        <div className="grid_item">
          <div>{item.quantity} x {convert(item.price)} {currency.symbol}</div>
        </div>

        <div className="grid_item">
          <div>{convert(item.subtotal)} {currency.symbol}</div>
        </div>
      </div>
    </>
  )
}

export default Item