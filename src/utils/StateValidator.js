/**
 * Class for validating state values with decimal precision constraints.
 */
class StateValidator {
  /**
   * @param {number} [decimalFigures=2] - Allowed decimal places, defaults to 2.
   */
  constructor(decimalFigures = 2) {
    this.decimalFigures = decimalFigures;
    this.regex = decimalFigures === 0
      ? /^\d*$/ // No decimals allowed
      : new RegExp(`^\\d*\\.?\\d{0,${decimalFigures}}$`);
  }

  /**
   * Validates input value against constraints.
   * @param {string} value - Input to validate.
   * @returns {string|undefined} Valid value or undefined if invalid.
   */
  sanitize(value) {
    if (parseFloat(value) === 0) return undefined;
    if (value.startsWith('-')) return undefined;
    return this.regex.test(value) ? value : undefined;
  }
}

export default StateValidator;