class DecimalInputSanitizer {
  constructor(decimalFigures = 2) {
    this.decimalFigures = decimalFigures;
    this.lastValidValue = "";
  }

  getSanitizedOf(value) {
    if (value == null) return this.lastValidValue;

    let input = String(value);
    input = input.replace(/-/g, '');

    // Eliminar caracteres no numéricos ni puntos
    input = input.replace(/[^0-9.]/g, ''); // <--- Cambio clave aquí

    // Anteponer '0' si empieza con punto
    if (input.startsWith('.')) {
      input = '0' + input;
    }

    // Procesar múltiples puntos
    const dotCount = (input.match(/\./g) || []).length;
    if (dotCount > 1) {
      const parts = input.split('.');
      const integerPart = parts[0] || '';
      const decimalParts = parts.slice(1).join('');
      input = integerPart + '.' + decimalParts;
    }

    // Truncar decimales si exceden la cantidad permitida
    if (input.includes('.')) {
      let [integerPart, decimalPart] = input.split('.');
      if (decimalPart.length > this.decimalFigures) {
        decimalPart = decimalPart.substring(0, this.decimalFigures);
        input = integerPart + '.' + decimalPart;
      }
    }

    // Actualizar y retornar el último valor válido
    this.lastValidValue = input;
    return input;
  }
}

export default DecimalInputSanitizer;