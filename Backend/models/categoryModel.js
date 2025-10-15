const knex = require('../config/knex');

exports.getAllCategories = () =>
  knex('products').distinct('category').orderBy('category');
