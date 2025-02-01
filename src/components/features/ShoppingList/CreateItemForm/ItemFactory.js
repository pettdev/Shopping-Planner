/**
 * @fileoverview Factory class to create new shopping list items.
 * @module ItemFactory
 * @requires ../../../../utils/now
 */
import now from "../../../../utils/now";
/**
 * Factory class to create new shopping list items.
 */
class ItemFactory {
  /**
   * Creates an instance of ItemFactory.
   * @param {string} name - The name of the item.
   * @param {string} description - The description of the item.
   * @param {string} brand - The brand of the item.
   * @param {string} selected_category - The category of the item.
   * @param {string} selected_unit - The unit of the item.
   */
  constructor(name, description, brand, selected_category, selected_unit) {
    this.name = name;
    this.description = description;
    this.brand = brand;
    this.selected_category = selected_category;
    this.selected_unit = selected_unit;
  }

  /**
   * Generates a unique ID for the item.
   * @returns {string} The unique ID for the item.
   */
  get id() {
    return `${this.name}_${this.brand}`.toLowerCase().replace(/ /g, '_');
  }

  /**
   * Builds the item object with the provided properties.
   * @returns {Object} The item object.
   */
  build() {
    this.item = {
      id: this.id,
      name: this.name,
      description: this.description,
      brand: this.brand,
      selected_category: this.selected_category,
      selected_unit: this.selected_unit,
      createdAt: now()
    };
    return this.item;
  }
}

export default ItemFactory;