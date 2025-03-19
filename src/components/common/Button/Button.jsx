/**
 * Button component renders a button element with customizable text and type.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.text - The text to display inside the button.
 * @param {string} [props.type="button"] - The type attribute for the button element.
 * @param {Object} [props.props] - Additional properties to pass to the button element.
 * @returns {JSX.Element} The rendered button element.
 */
import React from 'react'

const Button = ({ text, type = "button", ...props }) => {
  return (
    <button type={type} {...props}>
      {text}
    </button>
  )
}

export default Button