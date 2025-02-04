const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User"); // Import User model

const LoanAmount = sequelize.define(
  "LoanAmount",
  {
    loan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    loan_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    loan_interest: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    loan_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    loan_status: {
      type: DataTypes.ENUM("Active", "Repaid", "Defaulted"),
      defaultValue: "Active",
    },
  },
  {
    tableName: "Loan_Amounts",
    timestamps: false, // Disable timestamps if not needed
  }
);

module.exports = LoanAmount;
