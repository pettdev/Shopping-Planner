import now from '../../../utils/now'

/**
 * Factory function to create an item object.
 *
 * @param {Object} params - The parameters for creating an item.
 * @param {string} params.name - The name of the item.
 * @param {string} params.description - The description of the item.
 * @param {string} params.brand - The brand of the item.
 * @param {string} params.selected_category - The selected category of the item.
 * @param {string} params.selected_unit - The selling unit of the item.
 * @returns {Object} The created item object.
 */
export const itemFactory = (name, description, brand, selected_category, selected_unit) => {
  const item = {
    id: `${name}_${brand}`.toLowerCase().replace(/ /g, '_'),
    name: name,
    description: description,
    brand: brand,
    selected_category: selected_category,
    selected_unit: selected_unit,
    createdAt: now()
  }
  console.log(`item: ${JSON.stringify(item)} desde itemFactory.js`)
  
  return item
}