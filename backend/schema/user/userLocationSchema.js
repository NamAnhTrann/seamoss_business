const mongoose = require("mongoose");

const userLocation = new mongoose.Schema({
  // TODO --> Validator and hooks
  userLocationStreet: {
    type: String,
    required: false,
  },

  userLocationState: {
    type: String,
    required: false,
  },

  userLocationCity: {
    type: String,
    required: false,
  },
  userLocationCountry: {
    type: String,
    required: false,
    enum: ["United Kingdom", "Australia", "France", "Spain", "Vietnam"],
  },
});

module.exports = mongoose.model("Location", userLocation);
