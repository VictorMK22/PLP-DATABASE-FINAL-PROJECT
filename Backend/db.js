require("dotenv").config(); // Load environment variables from .env

const { Sequelize } = require("sequelize");

// Create a new Sequelize instance for MySQL using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
