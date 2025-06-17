const mongoose = require("mongoose");
const orderItemSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  productName: String,
  productPrice: Number,
  quantity: Number,
  imagePath: String,
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
