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
