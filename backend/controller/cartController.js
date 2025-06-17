const Carts = require("../schema/transaction/cartSchema");
const Products = require("../schema/product/productSchema");

module.exports = {
  addItemToCart: async function (req, res) {
    const { cartQuantity = 0, productId } = req.body;
    try {
      //this block handles user finding
      const userId = req.user?._id || req.session.user_id;
      if (!userId) {
        console.log("User not logged in");
        return res.status(401).json({ message: "User not found" });
      }
      //this block handles product matching quanities with cart quantities
      const products = await Products.findOne({
        _id: productId,
        productStock: { $gte: cartQuantity },
      });

      if (!products) {
        return res
          .status(404)
          .json({ message: "Product not found or out of stock" });
      }

      let cart = await Carts.findOne({ user_id: userId });
      if (!cart) {
        //since no cart initialied at first, new cart will be made
        cart = new Carts({
          user_id: userId,
          items: [], // t= 0 -> no items
        });
      }
      const existItem = cart.items.findIndex(
        (item) => item.product_id.toString() === productId.toString()
      );

      if (existItem !== -1) {
        cart.items[existItem].quantity += cartQuantity;
      } else {
        cart.items.push({
          product_id: productId,
          quantity: cartQuantity,
        });
      }
      cart.updatedAt = Date.now(); // update the updatedAt field
      await cart.save();
      return res.status(201).json({
        message: "Item added to cart successfully",
        cart,
      });
    } catch (err) {
      console.error("Add to Cart Error:", err); // 👈 Add this
      return res.status(500).json({
        message: "error, cannot add item to cart",
      });
    }
  },

  //list the cart
  listCart: async function (req, res) {
    try {
      const userId = req.user?._id || req.session.user_id;
      if (!userId) {
        console.log("User not logged in");
        return res.status(401).json({ message: "User not found" });
      }
      const cart = await Carts.findOne({ user_id: userId }).populate(
        "items.product_id"
      );
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      return res.status(200).json(cart);
    } catch (err) {
      return res.status(500).json({
        message: "error, cannot list cart",
      });
    }
  },

  //delete cart
  deleteCart: async function (req, res) {
    try {
      const userId = req.session.user_id;
      if (!userId) {
        console.log("User not logged in");
        return res.status(401).json({ message: "User not found" });
      }
      const cart = await Carts.findOneAndDelete({ user_id: userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      return res.status(200).json({ message: "Cart deleted successfully" });
    } catch (err) {
      return res.status(500).json({
        message: "error, cannot delete cart",
      });
    }
  },
};
