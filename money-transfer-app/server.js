require("dotenv").config();
const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile")[process.env.NODE_ENV || "development"];

// Create a Knex instance
const db = knex(knexConfig);

// Test the database connection on server start
db.raw('SELECT 1+1 AS result')
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Money Transfer App Backend"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, db };