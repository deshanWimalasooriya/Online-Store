const knex = require('../config/knex');

exports.getAll = () => {
  return knex('products').select('*');
};

exports.createProduct = (product) => {
  return knex('products').insert(product);
};

exports.getById = (id) => {
  return knex('products').where({ id }).first();
};

exports.updateProduct = (id, updatedData) => {
  return knex('products').where({ id }).update(updatedData);
};

exports.deleteProduct = (id) => {
  return knex('products').where({ id }).del();
};

// Get top 4 products by rating (Hot Deals)
exports.getTopRatedProducts = (limit = 4) => 
  knex('products')
    .select('*')
    .orderBy('rating', 'desc')
    .limit(limit);

// Get 4 most recently added products (New Tech)
exports.getRecentProducts = (limit = 4) => 
  knex('products')
    .select('*')
    .orderBy('created_at', 'desc')
    .limit(limit);
