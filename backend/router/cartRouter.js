const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.post("/add/item/to/cart/api", cartController.addItemToCart);
router.get("/list/cart/api", cartController.listCart);
router.delete("/delete/item/from/cart/api", cartController.deleteCart);

module.exports = router;
