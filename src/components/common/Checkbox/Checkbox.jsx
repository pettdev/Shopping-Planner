import { Input } from '..'

function Checkbox({
  id, labelText,
  checked, onChange,
  ...props}) {

  return (
    <Input type={'checkbox'} labelText={labelText} checked={checked} onChange={onChange} {...props}/>
  )
}

export default Checkbox