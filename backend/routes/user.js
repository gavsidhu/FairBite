const express = require("express");
const User = require("../database/models/user");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { email, firebaseId } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with email already exists" });
    }

    const newUser = await User.create({
        _id: firebaseId,
         email,
    });

    return res.status(201).json({
      user: newUser,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Bad Request" });
  }
});

router.post("/add-friend", async (req, res) => {
    const { friendEmail, userId } = req.body;
    try {
      const user = await User.findById(userId);
      const friend = await User.findOne({ email: friendEmail });
  
      if (!friend || !user) {
        return res.status(400).json({ message: "User does not exist" });
      }
  
      let userAdded = false;
      let friendAdded = false;
  
      if (!user.friends.some(friend => friend._id.toString() === friend.id)) {
        user.friends.push({
          email: friend.email,
          _id: friend.id
        });
        await user.save();
        userAdded = true;
      }
  
      if (!friend.friends.some(f => f._id.toString() === user.id)) {
        friend.friends.push({
          email: user.email,
          _id: user.id
        });
        await friend.save();
        friendAdded = true;
      }
  
      if (userAdded || friendAdded) {
        res.status(201).json(user);
      } else {
        res.status(200).json({ message: "Friends already added" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Bad Request" });
    }
  });

// Cannot get /add-preferences in console
router.post('/add-preferences', async (req, res) => {
  try {
    const { email, preferences } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    user.preferences = preferences;
    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Bad Request' });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
