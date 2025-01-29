/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.alterTable('transactions', (table) => {
      table.string('type').notNullable().defaultTo('deposit'); // Add the `type` column
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    await knex.schema.alterTable('transactions', (table) => {
      table.dropColumn('type'); // Remove the `type` column if rolled back
    });
  };  