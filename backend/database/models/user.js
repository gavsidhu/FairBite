const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: String,
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  friends: [
    {
      _id: String,
      email: String,
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User