/**
 * Input component that renders an input element with an optional label.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.type - The type of the input element.
 * @param {string} props.id - The id of the input element.
 * @param {string} [props.labelText] - The text for the optional label.
 * @param {Object} [props.rest] - Additional properties to be passed to the input element.
 * @returns {JSX.Element} The rendered input element, optionally wrapped in a label.
 */
import Label from "../Label"

const Input = ({ type, id, labelText, ...props }) => {
    return (
        <>
            {labelText 
                ? (<Label id={id} labelText={labelText}>
                    <input type={type} id={id} {...props} />
                    </Label>)
                : (<input type={type} id={id} {...props} />)}
        </>
    )
  }

export default Input