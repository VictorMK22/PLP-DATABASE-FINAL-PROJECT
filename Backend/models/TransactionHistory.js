const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const LoanAmount = require("./LoanAmount"); // Import LoanAmount model

const TransactionHistory = sequelize.define(
  "TransactionHistory",
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    loan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: LoanAmount,
        key: "loan_id",
      },
    },
    transaction_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    transaction_type: {
      type: DataTypes.ENUM("Borrow", "Repayment", "Penalty"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "Transaction_Histories",
    timestamps: false, // Disable timestamps if not needed
  }
);

module.exports = TransactionHistory;
