const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  profileImageUrl: { type: String, default: null },
  bookmarkedPolls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }]
}, { timestamps: true });

// Hashing the password before storing it.
UserSchema.pre("save", async (next) => {
  if (!this.isModified(password)) return next()
  this.password = await bcrypt.hash(this.password, 10);
  next()
});

// Compare passwords
UserSchema.methods.comparePassword = async (candidatePassword) => {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);