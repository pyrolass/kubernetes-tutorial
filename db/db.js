const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const db = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: { min: 0, max: 7 },
});

db.raw("select 1+1 as result")
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log("Database connection failed");
    console.log(err);
  });

module.exports = db;
