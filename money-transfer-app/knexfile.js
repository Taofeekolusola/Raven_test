// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
      client: "mysql2",
      connection: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "username",
        password: process.env.DB_PASS || "password",
          database: process.env.DB_NAME || "money_transfer_app",
        port: process.env.DB_PORT || 3307
      },
      migrations: {
        directory: "./src/migrations",
      },
      seeds: {
        directory: "./src/seeds",
      },
    },
  };
  