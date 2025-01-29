const bcrypt = require("bcrypt");
const db = require("../db");
const { generateToken } = require("../utils/generateToken");
const {generateAccountNumber} = require("../utils/generateAccountNumber");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if the email already exists
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique bank account number
    const bankAccountNumber = generateAccountNumber();

    // Insert new user into the database
    const [user] = await db("users").insert({
      name,
      email,
      password: hashedPassword,
      bank_account_number: bankAccountNumber,
    }).returning("*");

    // Generate JWT token
    const token = generateToken(user.id);

    // Send response
    res.status(201).json({
      message: "User created successfully.",
      user: { id: user.id, name: user.name, email: user.email, bank_account_number: user.bank_account_number },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Find user by email
    const user = await db("users").where({ email }).first();
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Send response
    res.status(200).json({
      message: "Login successful.",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
};


// Get User Profile Controller
const getUserProfile = async (req, res) => {
  try {
    // Get user's ID from the token and fetch user data from the database
    const userId = req.user.id;
    const user = await db("users").where({ id: userId }).first();

    // If user is not found, return 404 response
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      bank_account_number: user.bank_account_number,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  signup,
  login,
  getUserProfile,
};