const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const LoanAmount = require("./LoanAmount");

const InterestRate = sequelize.define(
  "InterestRate",
  {
    rate_id: {
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
    interest_rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    rate_effective_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Interest_Rates",
    timestamps: false, // Disable timestamps if not needed
  }
);

module.exports = InterestRate;
