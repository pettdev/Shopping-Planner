/**
 * Label component that renders a label element with optional text and children.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.htmlFor - The id of the element that this label is associated with.
 * @param {string} props.labelText - The text to be displayed inside the label.
 * @param {React.ReactNode} props.children - The children elements to be rendered inside the label.
 * @returns {JSX.Element} The rendered label element.
 */
const Label = ({htmlFor, labelText, children}) => {
  
  return (
    <label htmlFor={htmlFor}>
      {labelText}
      {children}
    </label>
  )
}

export default Label