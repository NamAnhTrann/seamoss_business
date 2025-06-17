const Product = require("../schema/product/productSchema");

module.exports = {
  //admin
  addProduct: async function (req, res) {
    try {
      const newProduct = new Product({
        ...req.body,
      });
      await newProduct.save();
      return res.status(201).json(newProduct);
    } catch (err) {
      return res.status(500).json({
        message: "error, cannot add product",
      });
    }
  },

  listProduct: async function (req, res) {
    try {
      const products = await Product.find({});
      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({
        message: "error, cannot list product",
      });
    }
  },

  listSpecificProduct: async function (req, res) {
    try {
      const productId = req.params.id;
      const products = await Product.findById(productId);
      if (!products) {
        console.log("Product does not exist");
        return res
          .status(404)
          .json({ message: "product not found or not existed" });
      } else {
        return res.status(201).json(products);
      }
    } catch (err) {
      return res.status(500).json({
        message: "error, cannot list product",
      });
    }
  },
};
