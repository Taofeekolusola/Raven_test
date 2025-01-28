/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Migration to add bank_account_number column
exports.up = async function(knex) {
    await knex.schema.table("users", (table) => {
      table.string("account_number"); // Just add the column first
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.table("users", (table) => {
      table.dropColumn("account_number");
    });
  };
  