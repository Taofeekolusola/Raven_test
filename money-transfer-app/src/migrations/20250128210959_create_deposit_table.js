/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('deposit', (table) => {
      table.increments('id').primary();               // Auto-increment primary key
      table.integer('user_id').unsigned().notNullable();  // Foreign key to users table
      table.decimal('amount', 10, 2).notNullable();    // Deposit amount
      table.string('status').notNullable();           // Deposit status (e.g., 'pending', 'completed')
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp when the deposit was created
      table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp for updates
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('deposit');  // Drops the deposit table if rolling back
  };  