const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  skillsOffered: [String],
  skillsWanted: [String],
  location: String
});

module.exports = mongoose.model("User", userSchema);