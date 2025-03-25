import Label from "../Label"
import './Input.css'

const Input = ({ type, id, labelText, ...props }) => {
    return (
        <>
            {labelText 
                ? (
                    <div className="input-container">
                      <Label labelText={labelText} htmlFor={id}>
                        <input type={type} id={id} {...props} />
                      </Label>
                    </div>
                  )
                : (<input type={type} id={id} {...props} />)}
        </>
    )
  }

export default Input