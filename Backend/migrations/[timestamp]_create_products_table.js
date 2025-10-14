exports.up = function(knex) {
  return knex.schema.createTable('products', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('brand').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.string('category').notNullable();
    table.string('theme');
    table.decimal('rating', 3, 2);
    table.string('image');
    table.text('description');
    table.json('specs');
    table.string('availability');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('products');
};
