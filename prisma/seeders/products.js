const crypto = require('crypto')

const productsGenerate = (amount) => {
  const categories = ['snack', 'accompaniment', 'drink', 'dessert']
  const products = []

  for (let i = 1; i <= amount; i++) {
    const ramdomIndex = Math.floor(Math.random() * categories.length)
    products.push({
      id: crypto.randomUUID(),
      name: `Product Test ${i}`,
      category: categories[ramdomIndex],
      description: `Product Test ${i}`,
      image: `http://host.com.br/product${i}`,
      price: i * 1000,
      createdAt: new Date()
    })
  }
  return products
}
module.exports = productsGenerate
