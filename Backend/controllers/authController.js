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

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validating the fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!." })
  }

  try {
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid Credentials" })
    }

    res.status(200).json({
      id: user._id,
      user: {
        ...user.toObject(),
        totalPollsCreated: 0,
        totalPollsVotes: 0,
        totalPollsBookmarked: 0,
      },
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message })
  }

 }

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const userInfo = {
      ...user.toObject(),
      totalPollsCreated: 0,
        totalPollsVotes: 0,
        totalPollsBookmarked: 0,
    }
    res.status(200).json(userInfo)
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message })
  }
 }