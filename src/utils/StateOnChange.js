/**
 * Class representing a state change handler.
 */
class StateOnChange {
  /**
   * Updates the state value if it matches the specified pattern.
   * 
   * @param {Function} setValue - The function to update the state value.
   * @param {string} value - The new value to be set.
   * 
   * The regular expression /^\d*\.?\d{0,2}$/ is used to validate the value.
   * Here's a detailed breakdown of each part of the regular expression:
   *
   * ^: Asserts the position at the start of the string.
   * \d*: Matches zero or more digits (0-9).
   * \.?: Matches zero or one literal dot (.). 
   * The backslash (\) is used to escape the dot,
   * which is a special character in regular expressions.
   * \d{0,2}: Matches zero, one, or two digits (0-9).
   * $: Asserts the position at the end of the string.
   * 
   * What This Regular Expression Validates?
   * ^\d*: The string can start with zero or more digits.
   * \.?: There can be zero or one dot (.) after the digits.
   * \d{0,2}$: After the optional dot, there can be zero, one, or two digits, and the string must end here.
   * 
   * Examples of Valid Strings:
   * "123": Matches ^\d* (one or more digits).
   * "123.45": Matches ^\d* (digits), \.? (one dot), and \d{0,2}$ (two digits).
   * "0.5": Matches ^\d* (one digit), \.? (one dot), and \d{0,2}$ (one digit).
   * ".99": Matches ^\d* (zero digits), \.? (one dot), and \d{0,2}$ (two digits).
   * 
   * Examples of Invalid Strings:
   * "123.456": Fails because there are more than two digits after the dot.
   * "abc": Fails because there are non-digit characters.
   * "12.34.56": Fails because there is more than one dot.
   */
  update(value, setValue) {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setValue(value);
    }
  }
}

export default StateOnChange
