import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {fetchRestaurants} from "../api/fetchRestaurants"
import RestaurantSwiper from '../components/RestaurantSwiper';

const Session = () => {
    const { id } = useParams();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants(id).then((data) => setRestaurants(data));
  }, [id]);

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