export const fetchRestaurants = (id) =>
  new Promise((resolve) => {
    const restaurants = [
      {
        id: 1,
        name: 'Restaurant 1',
        address: 'Address 1',
        rating: 4.5,
        image: 'https://via.placeholder.com/300',
      },
    ];

    setTimeout(() => {
      resolve(restaurants);
    }, 1000);
  });