import now from "../../../utils";

/**
 * Factory function to create an item object.
 *
 * @param {Object} params - The parameters for creating an item.
 * @param {string} params.name - The name of the item.
 * @param {string} params.description - The description of the item.
 * @param {string} params.brand - The brand of the item.
 * @param {string} params.category - The category of the item.
 * @param {string} params.image - The image URL of the item.
 * @param {string} params.selling_unit - The selling unit of the item.
 * @returns {Object} The created item object.
 */
export const itemFactory = ({ name, description, brand, category, image, price, selling_unit }) => {
  const item = {
    name: name,
    selling_unit: selling_unit,
    description: description,
    brand: brand,
    category: category,
    //image: image,
    id: `${name}_${brand}`.toLowerCase().replace(/ /g, '_'),
    createdAt: now(),
  };

  return item;
}