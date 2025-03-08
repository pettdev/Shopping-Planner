import './Item.css'


function Item({ item, currency }) {
  const name = `${item.name}`
  const weight = `${item.netWeight} ${item.weightUnit}`
  const convert = (value) => {
    // Si la moneda es USD, convierte usando la tasa
    const rate = currency.rate || 1
    return (value / rate).toFixed(2)
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