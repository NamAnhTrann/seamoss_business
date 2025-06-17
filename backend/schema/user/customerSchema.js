const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  userLastName: {
    type: String,
    required: false, // Optional for Google users
  },
  userFirstName: {
    type: String,
    required: false, // Optional for Google users
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: false,
  },
  userPhoneNumber: {
    type: Number,
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
  fullName: {
    type: String,
    required: false,
  },
  userCreatedAt: {
    type: Date,
    default: Date.now, // Use default to avoid manually setting it each time
  },
});

module.exports = mongoose.model("User", userSchema);
