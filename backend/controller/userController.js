const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../schema/user/customerSchema");
const Location = require("../schema/user/userLocationSchema");

module.exports = {
  // Register a new user
  signupUser: async function (req, res) {
    try {
      const { userFirstName, userLastName, userEmail, userPassword } = req.body;
      //check exsiting user.
      const existingUser = await User.findOne({
        userEmail,
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      //hash password
      const hashedPassword = await bcrypt.hash(userPassword, 10);

      //create new user
      const newUser = new User({
        userFirstName,
        userLastName,
        userEmail,
        userPassword: hashedPassword,
        userCreatedAt: new Date(),
      });
      await newUser.save();

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
          id: newUser._id,
          username: newUser.userEmail,
          email: newUser.userEmail,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // login user
  loginUser: async function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      //tie session id to user.

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        req.session.user_id = user._id;
        console.log("Session created:", req.session);
        console.log("Session ID:", req.session.user_id);

        return res.status(200).json({
          success: true,
          message: "Login successful",
          user: {
            id: user._id,
            email: user.userEmail,
            name: `${user.userFirstName} ${user.userLastName}`,
          },
        });
      });
    })(req, res, next);
  },

  updateUser: async function (req, res) {
    const userId = req.user?._id || req.session.user_id;
    try {
      const { userFirstName, userLastName, userPhoneNumber } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "You cannot be found" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          userFirstName,
          userLastName,
          userPhoneNumber,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
