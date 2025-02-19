import './Item.css'


function Item({ item, currencySymbol, currencyRate }) {
  const name = `${item.name}`
  const weight = `${item.netWeight} ${item.weightUnit}`
  const convert = (value) => (value / (currencyRate || 1)).toFixed(2)

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
          <div>{item.quantity} x {convert(item.price)} {currencySymbol}</div>
        </div>

        <div className="grid_item">
          <div>{convert(item.subtotal)} {currencySymbol}</div>
        </div>
      </div>
    </>
  );
}

export default Item;