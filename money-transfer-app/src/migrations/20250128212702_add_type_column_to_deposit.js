/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.alterTable('deposit', (table) => {
      table.string('transaction_id').notNullable().defaultTo('deposit'); // Add the `type` column
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    await knex.schema.alterTable('deposit', (table) => {
      table.dropColumn('transaction_id'); // Remove the `type` column if rolled back
    });
  };  