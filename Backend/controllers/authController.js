const User = require("../models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" })
}

// Register a new user
exports.registerUser = async (req, res) => {
  const { fullName, userName, email, password, profileImageUrl } = req.body;
  // Check for missing fields
  if (!fullName || !userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" })
  }

  // User name validation check
  // Allows alphanumeric characters and hyphens only
  const userNameRegex = /^[a-zA-Z0-90-]+$/
  if (!userNameRegex.test(userName)) {
    return res.status(400).json({ message: "Invalid Username. Only alphanumeric characters and hyphens are allowed" })
  }

  try {
    // Check if email already exists
    const existingUserEmail = await User.findOne({ email })
    if (existingUserEmail) {
      return res.status(400).json({ message: "Email already in use" })
    }
    // Check if Username exists
    const existingUserName = await User.findOne({ userName })
    if (existingUserName) {
      return res.status(400).json({ message: "User name not available. Try another one" })
    }

    // Create the User
    const user = await User.create({
      fullName,
      userName,
      email,
      password,
      profileImageUrl
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message })
  }

}

exports.loginUser = async (req, res) => { }

exports.getUserDetails = async (req, res) => { }