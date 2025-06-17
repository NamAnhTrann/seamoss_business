require("dotenv").config();
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SK);
const Order = require("../schema/transaction/orderSchema");
const Cart = require("../schema/transaction/cartSchema");

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
