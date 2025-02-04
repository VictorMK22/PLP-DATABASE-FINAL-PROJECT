const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db"); // assuming this file contains sequelize instance
const User = require("./models/User");
const LoanAmount = require("./models/LoanAmount");
const InterestRate = require("./models/InterestRate");
const RepaymentSchedule = require("./models/RepaymentSchedule");
const TransactionHistory = require("./models/TransactionHistory");
const { transactionDbHistories } = require("./controllers/historiesController");
const { loanDetails } = require("./controllers/loanDetailsController");
const { userDetails, addUser } = require("./controllers/usersController");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Sync Database
sequelize.sync({ alter: false }).then(() => {
  console.log("Database synced successfully.");
});

// Communicate with frontend
app.get("/api", (req, res) => {
  const message = `Hello, World! Receive greetings from backend👋.`;
  res.json(message);
});

// User Routes
app.get("/users", userDetails);

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone } = req.body;
  const user = await User.update(
    { first_name, last_name, email, phone },
    { where: { user_id: id } }
  );
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { user_id: id } });
  res.sendStatus(204);
});

// POST request to register a new user
app.post("/register", addUser);

// POST request to login a user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Loan Amount Routes
app.get("/loan-amounts", async (req, res) => {
  const loanAmounts = await LoanAmount.findAll();
  res.json(loanAmounts);
});

app.post("/loan-amounts", async (req, res) => {
  const { user_id, loan_amount, loan_date, status } = req.body;
  const loanAmount = await LoanAmount.create({
    user_id,
    loan_amount,
    loan_date,
    status,
  });
  res.json(loanAmount);
});

app.put("/loan-amounts/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id, loan_amount, loan_date, status } = req.body;
  const loanAmount = await LoanAmount.update(
    { user_id, loan_amount, loan_date, status },
    { where: { loan_id: id } }
  );
  res.json(loanAmount);
});

app.delete("/loan-amounts/:id", async (req, res) => {
  const { id } = req.params;
  await LoanAmount.destroy({ where: { loan_id: id } });
  res.sendStatus(204);
});

app.get("/loan-details", loanDetails);

// Interest Rate Routes
app.get("/interest-rates", async (req, res) => {
  const interestRates = await InterestRate.findAll();
  res.json(interestRates);
});

app.post("/interest-rates", async (req, res) => {
  const { loan_id, interest_rate, rate_effective_date } = req.body;
  const interestRate = await InterestRate.create({
    loan_id,
    interest_rate,
    rate_effective_date,
  });
  res.json(interestRate);
});

app.put("/interest-rates/:id", async (req, res) => {
  const { id } = req.params;
  const { loan_id, interest_rate, rate_effective_date } = req.body;
  const interestRate = await InterestRate.update(
    { loan_id, interest_rate, rate_effective_date },
    { where: { rate_id: id } }
  );
  res.json(interestRate);
});

app.delete("/interest-rates/:id", async (req, res) => {
  const { id } = req.params;
  await InterestRate.destroy({ where: { rate_id: id } });
  res.sendStatus(204);
});

// Repayment Schedule Routes
app.get("/repayment-schedules", async (req, res) => {
  const repaymentSchedules = await RepaymentSchedule.findAll();
  res.json(repaymentSchedules);
});

app.post("/repayment-schedules", async (req, res) => {
  const { loan_id, due_date, amount_due, status } = req.body;
  const repaymentSchedule = await RepaymentSchedule.create({
    loan_id,
    due_date,
    amount_due,
    status,
  });
  res.json(repaymentSchedule);
});

app.put("/repayment-schedules/:id", async (req, res) => {
  const { id } = req.params;
  const { loan_id, due_date, amount_due, status } = req.body;
  const repaymentSchedule = await RepaymentSchedule.update(
    { loan_id, due_date, amount_due, status },
    { where: { schedule_id: id } }
  );
  res.json(repaymentSchedule);
});

app.delete("/repayment-schedules/:id", async (req, res) => {
  const { id } = req.params;
  await RepaymentSchedule.destroy({ where: { schedule_id: id } });
  res.sendStatus(204);
});

// Transaction History Routes
app.get("/transaction-histories", transactionDbHistories);

app.post("/transaction-histories", async (req, res) => {
  const { loan_id, transaction_type, amount } = req.body;
  const transactionHistory = await TransactionHistory.create({
    loan_id,
    transaction_type,
    amount,
  });
  res.json(transactionHistory);
});

app.put("/transaction-histories/:id", async (req, res) => {
  const { id } = req.params;
  const { loan_id, transaction_type, amount } = req.body;
  const transactionHistory = await TransactionHistory.update(
    { loan_id, transaction_type, amount },
    { where: { transaction_id: id } }
  );
  res.json(transactionHistory);
});

app.delete("/transaction-histories/:id", async (req, res) => {
  const { id } = req.params;
  await TransactionHistory.destroy({ where: { transaction_id: id } });
  res.sendStatus(204);
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
