import React from 'react';

const RestaurantCard = ({ restaurant }) => {
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
        <p className="text-gray-600">{restaurant.rating} / 5</p>
      </div>
    </div>
  );
};

export default RestaurantCard;