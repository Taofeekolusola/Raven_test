/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("accounts", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.string("account_number").unique().notNullable();
      table.decimal("balance", 15, 2).defaultTo(0.0);
      table.foreign("user_id").references("id").inTable("users");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("accounts");
  };
  
