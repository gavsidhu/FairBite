export const getRestaurantsByCuisine = async (cuisine, location) => {
  return fetch(
    `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_YELP_API_URL}/businesses/search?term=restaurants&location=${location}&categories=${cuisine}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};
