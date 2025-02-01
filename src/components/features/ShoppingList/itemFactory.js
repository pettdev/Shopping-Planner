import now from '../../../utils/now'

/**
 * Factory function to create an item object.
 *
 * @param {Object} params - The parameters for creating an item.
 * @param {string} params.name - The name of the item.
 * @param {string} params.description - The description of the item.
 * @param {string} params.brand - The brand of the item.
 * @param {string} params.category - The category of the item.
 * @param {string} params.selected_unit - The selling unit of the item.
 * @param {string} params.exempt - The exemption of taxes of the item.
 * @returns {Object} The created item object.
 */
export const itemFactory = ({ name, description, brand, category, selected_unit }) => {
  const item = {
    name: name,
    selected_unit: selected_unit,
    description: description,
    brand: brand,
    category: category,
    id: `${name}_${brand}`.toLowerCase().replace(/ /g, '_'),
    createdAt: now(),
  };

  return item;
}