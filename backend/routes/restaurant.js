const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const { location, cuisine } = req.query;
  if (!location || !cuisine) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const cuisines = cuisine.split(',').map(c => `categories=${c}`).join('&');
  const { data: restaurants } = await axios.get(
    `https://api.yelp.com/v3/businesses/search?location=${location}&term=restaurant&${cuisines}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    }
  );
  return res.json(restaurants);
});

router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(`https://api.yelp.com/v3/businesses/${req.params.id}`, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });

    if (response.status === 404) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Bad request" });
  }
});



module.exports = router;
