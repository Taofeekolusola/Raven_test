/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("transactions", (table) => {
      table.increments("id").primary();
      table.integer("account_id").unsigned().notNullable();
      table.enum("type", ["deposit", "transfer"]).notNullable();
      table.decimal("amount", 15, 2).notNullable();
      table.string("description").notNullable();
      table.string("reference").unique().notNullable();
      table.foreign("account_id").references("id").inTable("accounts");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("transactions");
  };  
