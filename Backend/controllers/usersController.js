const db = require("../db");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const userDetails = async (req, res) => {
  const queryUsers = `SELECT * FROM users`;

  try {
    const [users] = await db.query(queryUsers); // Destructuring to get the result of the query
    console.log(users); // Logs users data for debugging
    res.json(users); // Sends the user data as JSON response
  } catch (error) {
    console.error("Error fetching users:", error); // Logs error to the console
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message }); // Sends a proper error response with status code
  }
};

const addUser = async (req, res) => {
  const { username, email, password, phone, role, status } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      role,
      status,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const LoginUser = async (req, res) => {
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
};

module.exports = { userDetails, addUser, LoginUser };
