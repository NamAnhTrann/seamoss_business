require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("./strategy/google");

const app = express();

require("./strategy/local");
const allowedOrigins = ["http://localhost:4200"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

const contactRouter = require("./router/contactUsRouter");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const cartRouter = require("./router/cartRouter");
const orderRouter = require("./router/orderRouter");
const paymentRouter = require("./router/paymentRouter");
app.use(contactRouter);
app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(paymentRouter);

const db_url = process.env.MONGO_DB_URL;
const port_no = process.env.PORT_NO;

app.listen(port_no, function (err) {
  if (!err) console.log(`listens on ${port_no}`);
  else console.log("Error", err);
});

app.get("/", (req, res) => {
  res.send("Backend is Running!");
});

async function connectDB() {
  try {
    await mongoose.connect(db_url);
    console.log("Conneted to the database");
  } catch (err) {
    console.log("Connection Error");
  }
}

connectDB();
