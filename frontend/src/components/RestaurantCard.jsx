import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const RestaurantCard = ({ restaurant }) => {
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = Math.floor(5 - rating);
  
    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <BsStarFill key={index} className="text-yellow-400" />
          ))}
        {halfStar && <BsStarHalf className="text-yellow-400" />}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <BsStar key={index} className="text-yellow-400" />
          ))}
      </>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        className="w-full h-64 object-cover rounded-t-lg"
        src={restaurant.image_url}
        alt={restaurant.name}
      />
      <div className="mt-4 h-24">
        <h3 className="text-xl font-semibold">{restaurant.name}</h3>
        <p className="text-gray-600">{restaurant.address}</p>
        <div className="flex items-center text-gray-600">
          {renderRating(restaurant.rating)}
          <span className="ml-1">{restaurant.rating} / 5</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;