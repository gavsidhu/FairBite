const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  firebaseId: {
    type: String,
    require: true,
    unique: true
  },
  friends: [
    {
      id: String,
      email: String,
      firebaseId: String
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User