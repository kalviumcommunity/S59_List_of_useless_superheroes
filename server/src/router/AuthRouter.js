const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
require('dotenv').config();

// User List

router.get('/users', async(req, res) => {
    const data = await User.find()
    res.send(data)
}
);


// USER SIGNUP

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with the provided email or username already exists' });
    }

    const newUser = new User({ username, email });

    newUser.setPassword(password);

    await newUser.save();

    res.status(201).json({ message: 'User successfully created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// User Authentication 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({token, userName : user.username, userId : user._id});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router