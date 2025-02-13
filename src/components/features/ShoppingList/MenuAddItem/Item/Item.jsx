import './Item.css'

function Item({ item }) {
  const name = `${item.name}`
  const weight = `${item.netWeight} ${item.weightUnit}`

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
          <div>{item.quantity}</div>
        </div>

        <div className="grid_item">
          <div>{item.price}</div>
        </div>

        <div className="grid_item">
          <div>{item.subtotal}</div>
        </div>
      </div>
    </>
  );
}

export default Item;