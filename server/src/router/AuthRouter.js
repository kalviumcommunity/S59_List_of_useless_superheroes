const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
require("dotenv").config();
const passport = require("passport");
const SessionUser = require("../models/oauth");

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
  async (req, res) => {
    if (req.user) {
      // Set user name cookie
      // res.cookie('userName', req.user.name.givenName, {
      //   maxAge: 900000, 
      //   httpOnly: false,
      //   secure: false 
      // });

      // Set token cookie
      const token = jwt.sign({ userId: req.user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      // res.cookie('token', token, {
      //   maxAge: 900000, 
      //   httpOnly: false,
      //   secure: false 
      // });

      // delete current user
      const currentUser = await SessionUser.findOneAndDelete({ label: 'current' });

      // Save user to the database
      const sessionUser = new SessionUser({
        userName: req.user.name.givenName,
        token: token,
      });

      await sessionUser.save();


      // Debugging
      console.log(req.user);

      // Redirect to the frontend application
      res.redirect('https://herorank.netlify.app/login/oauth/success');
      // res.redirect('http://localhost:5173/login/oauth/success');
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
  
// fetch find and delete user
router.get("/login/success/user", async (req, res) => {
  try {
    // Fetch the current user
    const currentUser = await SessionUser.findOne({ label: 'current' });

    if (!currentUser) {
      return res.status(404).json({ message: 'No current user found' });
    }

    // Send the current user data in the response
    res.json(currentUser);
  } catch (error) {
    console.error('Error fetching and deleting current user:', error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});


module.exports = router;