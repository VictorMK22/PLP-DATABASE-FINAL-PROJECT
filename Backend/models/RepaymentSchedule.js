const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const LoanAmount = require("./LoanAmount"); // Import LoanAmount model

const RepaymentSchedule = sequelize.define(
  "RepaymentSchedule",
  {
    schedule_id: {
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
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount_due: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Paid", "Pending"),
      defaultValue: "Pending",
    },
  },
  {
    tableName: "Repayment_Schedules",
    timestamps: false, // Disable timestamps if not needed
  }
);

module.exports = RepaymentSchedule;
