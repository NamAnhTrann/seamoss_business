const Location = require("../schema/user/userLocationSchema");
const User = require("../schema/user/customerSchema");
const Order = require("../schema/transaction/orderSchema");
const OrderItem = require("../schema/transaction/orderItemSchema");
const Cart = require("../schema/transaction/cartSchema");

module.exports = {
  //add order delivery address
  deliveryOrder: async function (req, res) {
    try {
      const newLocation = new Location({
        ...req.body,
      });
      await newLocation.save();
      return res.status(201).json(newLocation);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "error, cannot add location", err });
    }
  },

  createOrder: async function (req, res) {
    try {
      const userId = req.user?._id || req.session.user_id;
      if (!userId) {
        return res.status(401).json({ message: "User not logged in" });
      }
      const { orderLocation } = req.body;

      const cart = await Cart.findOne({ user_id: userId }).populate(
        "items.product_id"
      );
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      const orderItemIds = [];
      for (const item of cart.items) {
        const orderItem = new OrderItem({
          productId: item.product_id._id,
          productName: item.product_id.productName,
          productPrice: item.product_id.productPrice,
          quantity: item.quantity,
          imagePath: item.product_id.imagePath,
        });
        await orderItem.save();
        orderItemIds.push(orderItem._id);
      }

      const orderSubTotal = cart.items.reduce((sum, item) => {
        return sum + item.product_id.productPrice * item.quantity;
      }, 0);

      const orderTotalAmount = orderSubTotal + orderSubTotal * 0.1;

      const newOrder = new Order({
        orderUser: userId,
        orderLocation,
        orderItems: orderItemIds,
        orderSubTotal,
        orderTotalAmount,
        orderStatus: "Pending",
      });

      await newOrder.save();
      return res.status(201).json({
        message: "Order created successfully",
        order: newOrder,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to create order", error: err.message || err });
    }
  },
};
