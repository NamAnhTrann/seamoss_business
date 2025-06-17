//this is to map the existed cart, sicne cart will be cleared.
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userPhone: String,
  orderStatus: {
    type: String,
    enum: ["Pending", "Paid", "Delivered", "Cancelled"],
    default: "Pending",
  },
  orderSubTotal: {
    type: Number,
    required: true,
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],

  orderUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  orderLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: false,
  },
  orderCreatedAt: {
    type: Date,
    default: Date.now,
  },
  orderTotalAmount: {
    type: Number,
    required: true,
  },
  orderUpdatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
