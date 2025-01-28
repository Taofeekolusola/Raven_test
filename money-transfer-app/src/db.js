const knex = require("knex");
const knexConfig = require("../knexfile")[process.env.NODE_ENV || "development"];
const db = knex(knexConfig);

module.exports = db;