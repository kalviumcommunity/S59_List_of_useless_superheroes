const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
require("dotenv").config();
const passport = require("passport");

// 
function isLoggedIn(req, res, next) {
  (req.user) ? next() : res.sendStatus(401);
}
// 
// User List

router.get("/users", async (req, res) => {
  const data = await User.find();
  res.send(data);
});

// USER SIGNUP

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({
          error: "User with the provided email or username already exists",
        });
    }

    const newUser = new User({ username, email });

    newUser.setPassword(password);

    await newUser.save();

    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User Authentication
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userName: user.username, userId: user._id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Google Oauth

router.get(
  "/login/failed"
  ,
  (req, res) => {
    res.status(401).json({
      error: true, 
      message: "Google login failed",
    });
  }
);

router.get(
  "/login/success", isLoggedIn,
  (req, res) => {
    if (req.user) {
      const userNameCookieOptions = {
        maxAge: 900000, // Adjust maxAge as needed
        domain: 'herorank.netlify.app' // Specify the correct domain
      };

      res.cookie('userName', req.user.name.givenName, userNameCookieOptions);

      req.session.user = req.user;

      const token = jwt.sign({ userId: req.user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      const tokenCookieOptions = {
        maxAge: 900000, // Adjust maxAge as needed
        domain: 'herorank.netlify.app' // Specify the correct domain
      };

      res.cookie('token', token, tokenCookieOptions);

      // Debugging
      console.log(req.user);

      // Redirect to the frontend application
      res.redirect('https://herorank.netlify.app/');
    } else {
      res.status(401).json({
        error: true,
        message: "User has not authenticated",
      });
    }
  }
);


// google Oauth get


router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login/failed" }),
  function (req, res) {
    res.redirect("/auth/login/success");
  }
  );
  
  router.get(
    "/google",
    passport.authenticate("google", { scope: ['email', 'profile'] })
  );
  
module.exports = router;
