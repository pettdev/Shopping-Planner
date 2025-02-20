import Currency from "./Currency";

const USD = new Currency('Dólar Estadounidense','USD','$')
const BS = new Currency('Bolívares','VES','Bs')
const EURO = new Currency('Euro', 'EUR', '€')
const all = [USD, BS, EURO]

const DEFAULT_CURRENCY = BS

export default {USD, BS, DEFAULT_CURRENCY, all}