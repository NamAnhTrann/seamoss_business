const mongoose = require("mongoose");

let contactUsSchema = new mongoose.Schema({
  contactLastName: {
    type: String,
    requried: true,
    //TODO --> validator
  },
  contactFirstName: {
    type: String,
    required: true,
  },
  contactContactEmail: {
    type: String,
    required: false,
  },
  contactPhoneNumber: {
    type: String,
    required: false,
  },

  contactCreatedAt: {
    type: Date,
    required: true,
  },

  contactMessage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contact", contactUsSchema);
