const knex = require('../config/knex');

exports.getAll = () => {
  return knex('products').select('*');
};

exports.createProduct = (product) => {
  return knex('products').insert(product);
};
