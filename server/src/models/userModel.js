const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // unique: true,
    // trim: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    // trim: true,
    // lowercase: true,
  },
  // Storing the hashed password and salt
  password: {
    hash: String,
    salt: String,
  },
}, { timestamps: true });

// Use crypto to hash the password before saving it to the database
userSchema.methods.setPassword = function (password) {
  this.password.salt = crypto.randomBytes(16).toString('hex');
  this.password.hash = crypto
    .pbkdf2Sync(password, this.password.salt, 1000, 64, 'sha512')
    .toString('hex');
};

// Method to compare hashed password during login
userSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.password.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.password.hash === hash;
};

const User = mongoose.model('users', userSchema);

module.exports = User;
