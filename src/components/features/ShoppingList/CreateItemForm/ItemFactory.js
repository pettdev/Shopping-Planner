
class ItemFactory {

  build(item) {
    return {
      name: item.name,
      category: item.category,
      description: item.description,
      brand: item.brand,
      netWeight: item.netWeight,
      weightUnit: item.weightUnit,
    };
  }
}

export default ItemFactory;