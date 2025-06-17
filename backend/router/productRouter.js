const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.post("/add/product/api", productController.addProduct); //admin
router.get("/list/product/api", productController.listProduct);
router.get("/list/product/api/:id", productController.listSpecificProduct);
module.exports = router;
