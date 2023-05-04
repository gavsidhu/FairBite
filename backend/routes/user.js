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
    const { id } = req.params;
    const user = await User.findById(id);
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

    if (!user.friends.includes({
        email: friend.email,
        _id: friend.id

      })) {
      user.friends.push({
        email: friend.email,
        _id: friend.id

      });
      await user.save();
    }
    res.status(201).json(user)
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Bad Request" });
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
