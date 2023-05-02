export const getRestaurantsByCuisine = async (cuisine, location) => {
  return fetch(`${process.env.REACT_APP_YELP_API_URL}/businesses/search`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
      "Content-Type": "application/json",
    },
    params: {
      term: "restaurants",
      location: location,
      categories: cuisine,
    },
  });
};
