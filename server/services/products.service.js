const Product = require('../models/products');

// Create a new product
async function createProduct(data) {
  console.log('Data received in service:', data);
  const product = new Product(data);
  return await product.save();
}

// Get all products
async function getAllProducts() {
  return await Product.find();
}

// Get a product by ID
async function getProductById(id) {
  return await Product.findById(id);
}

// Update a product by ID
async function updateProduct(id, data) {
  return await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

// Delete a product by ID
async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
