class ItemBody {
  build(item) {
    return {
      name: item.name,
      category: item.category,
      description: item.description,
      brand: item.brand,
      netWeight: item.netWeight,
      weightUnit: item.weightUnit,
      searchTokens: []
    }
  }
}

export default ItemBody