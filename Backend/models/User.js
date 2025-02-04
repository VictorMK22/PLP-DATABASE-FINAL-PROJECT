const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db"); // Ensure this points to your Sequelize instance

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true, // Ensure email is unique
      validate: {
        isEmail: true, // Validates email format
      },
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      validate: {
        is: /^[0-9]+$/i, // Validates phone number to only contain numbers
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "users", // Ensure table name matches the existing table name
    timestamps: true, // Since you're using custom columns like created_at
  }
);

module.exports = User;
