const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const { location, cuisine } = req.query;
  if (!location || !cuisine) {
    res.status(400).json({ message: "Missing required fields" });
  }

  const { data: restaurants } = await axios.get(
    `https://api.yelp.com/v3/businesses/search?location=${location}&term=restaurant&categories=${cuisine}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    }
  );
  return res.json(restaurants);
});

module.exports = router;
