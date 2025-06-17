  const mongoose = require("mongoose");

  let productSchema = new mongoose.Schema({
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productCreatedAt: {
      type: Date,
      required: true,
    },
    productStock: {
      type: Number,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    //use this only for admin
    productUpdatedAt: {
      type: Date,
      required: false,
    },
    productImage: {
      type: String,
      required: false,
    },
  });

  module.exports = mongoose.model("Product", productSchema);
