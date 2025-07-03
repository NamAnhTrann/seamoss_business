const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
const paymentController = require("../controller/paymentController");

router.post("/payment/api", paymentController.createPayment);
router.post(
  "/stripe/webhook/api",
  bodyParser.raw({ type: "application/json" }),
  paymentController.stripeWebhook
);

module.exports = router;
