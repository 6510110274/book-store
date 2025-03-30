// knex migrate:up
exports.up = function(knex) {
  return knex.schema
    .createTable('category', function (table) {
      table.increments('id').unsigned().primary();
      table.string('title', 100).notNullable();
    })

    .createTable('author', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).notNullable();
    })

    .createTable('publisher', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).notNullable();
    })

    .createTable('book', function (table) {
      table.increments('id').unsigned().primary();
      table.string('title', 255).notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.integer('stock_amount').unsigned().notNullable();
      
      table.integer('category_id').unsigned()
        .references('id').inTable('category').onDelete('CASCADE');

      table.integer('author_id').unsigned()
        .references('id').inTable('author').onDelete('SET NULL');

      table.integer('publisher_id').unsigned()
        .references('id').inTable('publisher').onDelete('SET NULL');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('book')
    .dropTableIfExists('publisher')
    .dropTableIfExists('author')
    .dropTableIfExists('category');
};

exports.config = { transaction: false };
