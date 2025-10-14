const productModel = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = req.body;
    await productModel.createProduct(product);
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.getById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;
    const updated = await productModel.updateProduct(productId, updatedData);
    if (updated) {
      res.json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleted = await productModel.deleteProduct(productId);
    if (deleted) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};