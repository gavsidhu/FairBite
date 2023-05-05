const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  users: [
    {
      _id: String,
      email: String,
      joined: {
        type: Boolean,
        default: false,
      },
    },
  ],
  likedRestaurants: [
    {
      restaurantId: String,
      users: [String],
    },
  ],
  location: String,
  expired: {
    type:Boolean,
    default: false
  },
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session