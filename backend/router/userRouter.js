const express = require("express");
const passport = require("passport");
const userController = require("../controller/userController");

const router = express.Router();

// Local Auth Routes
router.post("/login/user/api", userController.loginUser);
router.post("/signup/user/api", userController.signupUser);
router.put("/update/user/info/api", userController.updateUser);

// Google OAuth Routes
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-page",
    session: true,
  }),
  (req, res) => {
    console.log("User authenticated with Google:", req.user);
    res.redirect("http://localhost:4200"); // or wherever you want
  }
);

module.exports = router;
