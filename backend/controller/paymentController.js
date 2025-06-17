const User = require("../schema/user/customerSchema");
const Location = require("../schema/user/userLocationSchema");
const Order = require("../schema/transaction/orderSchema");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SK);

module.exports = {
  createPayment: async function (req, res) {
    const userId = req.user?._id || req.session.user_id;
    if (!userId) {
      return res.status(401).json({ message: "User not logged in" });
    }
    try {
      const order = await Order.findOne({
        orderUser: userId,
        orderStatus: "Pending",
      }).populate("orderItems");
      if (!order || order.orderItems.length === 0) {
        return res.status(400).json({ message: "No pending orders found" });
      }

      //make the line items here
      const lineItems = order.orderItems.map((item) => ({
        price_data: {
          currency: "aud",
          product_data: {
            name: item.productName,
            images: [item.imagePath],
          },
          unit_amount: item.productPrice * 100, // Convert to cents
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:4200",
        cancel_url: "http://localhost:4200",
        //the below codes are for production
        // success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        // cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });
      return res.status(200).json({ url: session.url });
    } catch (err) {
      console.error("Error creating payment:", err);
      return res.status(500).json({ message: "Error creating payment", err });
    }
  },

  onSucceedPayment: async function (req, res) {
    const userId = req.user?._id || req.session.user_id;
    try {
      const order = await Order.findOne({
        orderUser: userId,
        orderStatus: "Pending",
      });
      if (!order) {
        return res.status(400).json({ message: "No pending orders found" });
      }

      // Update the order status to 'Paid'
      order.orderStatus = "Paid";
      await order.save();

      // Delete the cart
      await Cart.deleteOne({ user_id: userId });

      return res.status(200).json({ message: "Payment successful", order });
    } catch (err) {
      console.error("Error processing payment success:", err);
      return res.status(500).json({ message: "Error processing payment", err });
    }
  },
};
