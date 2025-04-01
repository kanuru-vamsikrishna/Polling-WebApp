const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  fileName: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`)
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Only .jpeg, .png, .jpg formats are allowed"), false)
  }
}

const upload = multer({ storage, fileFilter })

module.exports = upload;