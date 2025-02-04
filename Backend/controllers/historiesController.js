const sequelize = require("../db");

const transactionDbHistories = async (req, res) => {
  const queryHistory = `SELECT * FROM transaction_histories`;

  try {
    const [histories] = await sequelize.query(queryHistory); // Await the query and destructure the result
    res.json(histories); // Send the result as JSON
  } catch (error) {
    console.error("Error fetching transaction histories:", error);
    res.status(500).json({ message: "Error fetching transaction histories" });
  }
};

module.exports = { transactionDbHistories };
