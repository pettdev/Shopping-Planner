class StateValidator {

  constructor(decimalFigures = 2) {
    this.decimalFigures = decimalFigures;
    this.regex = decimalFigures === 0
      ? /^\d*$/ // No decimals allowed
      : new RegExp(`^\\d*\\.?\\d{0,${decimalFigures}}$`);
  }

  sanitize(value) {
    const number = parseFloat(value);
    if (isNaN(number) || number <= 0) return '';
    return number.toFixed(2).replace(/\.?0+$/, '');
  }
}

export default StateValidator;