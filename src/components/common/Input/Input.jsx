import Label from "../Label"

/**
 * Input component with optional label.
 *
 * Renders an input element, optionally wrapped in a Label component if labelText is provided.
 *
 * @component
 * @param {object} props - Component props.
 * @param {string} props.type - Type of the input element (e.g., "text", "email", "password").
 * @param {string} props.id - Unique identifier for the input element and associated label.
 * @param {string} [props.labelText] - Text to display as the label. If provided, a Label component will wrap the input.
 * @param {object} [props.props] -  All other props are spread onto the input element. Accepts standard HTML input attributes.
 *
 * @returns {JSX.Element} Input element, possibly wrapped in a Label.
 */
const Input = ({ type, id, labelText, ...props }) => {
    return (
        <>
            {labelText 
                ? (<Label id={id} labelText={labelText}>
                    <input type={type} id={id} {...props}/>
                    </Label>)
                : (<input type={type} id={id} {...props} />)}
        </>
    )
  }

export default Input