/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.alterTable('transactions', (table) => {
      table.renameColumn('account_id', 'user_id');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    await knex.schema.alterTable('transactions', (table) => {
      table.renameColumn('user_id', 'account_id');
    });
  };
  
