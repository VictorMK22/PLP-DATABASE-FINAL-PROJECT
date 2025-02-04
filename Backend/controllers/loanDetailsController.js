const sequelize = require("../db");

const loanDetails = async (req, res) => {
  const queryLoan = `SELECT * FROM loan_amounts`;

  try {
    const [details] = await sequelize.query(queryLoan);
    res.json(details);
  } catch (error) {
    console.log("Error occurred while fetching loan details:", error);
  }
};

module.exports = { loanDetails };
