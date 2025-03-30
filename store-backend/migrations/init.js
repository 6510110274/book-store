// knex migrate:up
exports.up = function(knex) {
    return knex.schema
      .createTable('category', function (table) {
        table.increments('id').unsigned().primary(); // ใช้ integer ธรรมดา เพราะคุณใส่ id เอง
        table.string('title', 100).notNullable();
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('category');
  };
  
  exports.config = { transaction: false };
  