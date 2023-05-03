const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  likedRestaurants: [
    {
      restaurantId: String,
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
  ],
  expired: {
    type:Boolean,
    default: false
  },
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session