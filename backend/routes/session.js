const express = require("express");
const Session = require("../database/models/session");
const shuffleArray = require("../utils/shuffleArray")

const router = express.Router();

// Get session by id
router.get('/:id', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      res.status(404).send('Session not found');
      return;
    }

    res.json(session);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create a new session
router.post('/', async (req, res) => {
  const {users, location} = req.body
    try {
      const session = new Session({
        users,
        likedRestaurants: [],
        location,
        expired: false
      });
  
      const savedSession = await session.save();
      res.status(200).json(savedSession);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // Join a session
  router.put('/:id/join', async (req, res) => {
    try {
      const session = await Session.findById(req.params.id);
      const userId = req.body.userId // Assuming you pass userId in the request body
  
      if (!session) {
        res.status(404).send('Session not found');
        return;
      }
  
      if (session.expired) {
        res.status(403).send('Session expired');
        return;
      }
  
      if (!session.users.includes(userId)) {
        session.users.push(userId);
        await session.save();
      }
  
      res.json(session);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // Like a restaurant
router.put('/:id/like', async (req, res) => {
    try {
      const session = await Session.findById(req.params.id);
      const userId = req.body.userId // Assuming you pass userId in the request body
      const restaurantId = req.body.restaurantId;
  
      if (!session) {
        res.status(404).send('Session not found');
        return;
      }
  
      const likedRestaurant = session.likedRestaurants.find(
        (restaurant) => restaurant.restaurantId === restaurantId
      );
  
      if (likedRestaurant) {
        if (!likedRestaurant.users.includes(userId)) {
          likedRestaurant.users.push(userId);
        }
      } else {
        session.likedRestaurants.push({
          restaurantId: restaurantId,
          users: [userId],
        });
      }
  
      await session.save();
      res.json(session);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // Get session results
  router.get('/:id/results', async (req, res) => {
    try {
      const session = await Session.findById(req.params.id);  
      if (!session) {
        res.status(404).send('Session not found');
        return;
      }
  
      // If the result is already set, return it as the response
      if (session.result) {
        res.json({ result: session.result });
        return;
      }
  
      // Find the restaurant(s) with the most overlapping likes
      const sortedRestaurants = session.likedRestaurants.sort(
        (a, b) => b.users.length - a.users.length
      );
  
      let selectedResult;
  
      // Check if there are no overlapping liked restaurants
      if (sortedRestaurants[0].users.length === 1) {
        // Shuffle the restaurant array
        shuffleArray(sortedRestaurants);
        selectedResult = sortedRestaurants[0].restaurantId;
      } else {
        selectedResult = sortedRestaurants[0].restaurantId;
      }
  
      // Update the session with the selected result and save it to the database
      session.result = selectedResult;
      await session.save();
  
      res.json({ result: selectedResult });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // Expire a session
  router.put('/:id/expire', async (req, res) => {
    try {
      const session = await Session.findById(req.params.id);
  
      if (!session) {
        res.status(404).send('Session not found');
        return;
      }
  
      session.expired = true;
      await session.save();
  
      res.json(session);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  module.exports = router