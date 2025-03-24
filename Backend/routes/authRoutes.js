const express = require("express")
const { registerUser, loginUser, getUserDetails } = require("../controllers/authController")

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getUser", getUserDetails)

module.exports = router;