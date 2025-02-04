function Item({props}) {

  const subtotal = Number(props.quantity * props.price).toFixed(2)

  return (
    <>
      <li id={props.id}>
        <h2>edit</h2>
        <div>
          <h1>{props.name}</h1>
          <h2>{props.description}</h2>
          <h3>{props.marca}</h3>
        </div>
        <div>
          <h1>{props.quantity}</h1>
          <h2>{props.selling_unit}</h2>
        </div>
        <h1>{props.price}</h1>
        <h1>{subtotal}</h1>
      </li>
    </>
  )
}

export default Item