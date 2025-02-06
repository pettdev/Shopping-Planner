function Item({item}) {

  return (
    <>
      <li id={item.id}>
        <div>
          <h1>{item.name}</h1>
          <h2>{item.description}</h2>
          <h3>{item.brand}</h3>
        </div>
        <div>
          <h1>{item.quantity}</h1>
          <h2>{item.selling_unit}</h2>
        </div>
        <h1>{item.price}</h1>
        {/* <h1>{SUBTOTAL SUBTOTAL SUBTOTAL}</h1> */}
      </li>
    </>
  )
}

export default Item