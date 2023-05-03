import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import {AiFillLike, AiFillDislike} from 'react-icons/ai'

const RestaurantSwiper = ({ restaurants }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () => {
    // Perform any action related to liking a restaurant
    nextRestaurant();
  };

  const handleDislike = () => {
    // Perform any action related to disliking a restaurant
    nextRestaurant();
  };

  const nextRestaurant = () => {
    setCurrentIndex((currentIndex + 1) % restaurants.length);
  };

  return (
    <div className="relative">
      <RestaurantCard restaurant={restaurants[currentIndex]} />

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          className="bg-red-500 text-white p-4 rounded-full shadow-md"
          onClick={handleDislike}
        >
          <AiFillDislike className='h-4 w-4' />
        </button>
        <button
          className="bg-green-500 text-white p-4 rounded-full shadow-md"
          onClick={handleLike}
        >
          <AiFillLike className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
};

export default RestaurantSwiper;