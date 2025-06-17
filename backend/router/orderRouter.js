const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.post("/add/delivery/address/api", orderController.deliveryOrder);
router.post("/create/order/api", orderController.createOrder);
module.exports = router;
