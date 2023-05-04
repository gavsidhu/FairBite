import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantSwiper from '../components/RestaurantSwiper';
import { getRestaurantsByCuisine } from '../api/get-restuarants-by-cuisine';


const Session = () => {
    const { id } = useParams();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurantsByCuisine("chinese", "san francisco").then((res) => {
        res.json().then((data) => {
            setRestaurants(data.businesses)
        })
    })
  }, []);

  return (
    <div className="max-w-xl mx-auto px4">
      {restaurants.length > 0 ? (
        <RestaurantSwiper restaurants={restaurants} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Session;