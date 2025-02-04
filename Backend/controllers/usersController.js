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
    res.status(500).json({ message: "Error fetching users", error: error.message }); // Sends a proper error response with status code
  }
};


const addUser = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    role,
    status,
    profile_picture,
  } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone,
      role,
      status,
      profile_picture,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

module.exports = { userDetails, addUser };
