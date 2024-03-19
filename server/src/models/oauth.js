const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    label: {
    type: String,
    required: true,
    default: 'current'
    },
  userName: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires: 5, 
    default: Date.now 
}
});


const SessionUser = mongoose.model('sessions', UserSchema);

module.exports = SessionUser;
