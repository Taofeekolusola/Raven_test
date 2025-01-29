/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.alterTable('transactions', (table) => {
      table.renameColumn('type', 'account_number');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    await knex.schema.alterTable('transactions', (table) => {
      table.renameColumn('account_number', 'type');
    });
  };
  
