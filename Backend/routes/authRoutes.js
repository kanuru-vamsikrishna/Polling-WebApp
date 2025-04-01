const express = require("express")
const { registerUser, loginUser, getUserDetails } = require("../controllers/authController")
const { protects } = require("../middlewares/authMiddleware")
const upload = require("../middlewares/uploadMiddleware")

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getUser", protects, getUserDetails)

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" })
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
  res.status(200).json({ imageUrl })
})

module.exports = router;