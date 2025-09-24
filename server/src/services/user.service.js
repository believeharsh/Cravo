import List from '../models/list.model.js';
import RestaurantList from '../models/restaurantList.model.js';

const createDefaultLists = async userId => {
  console.log('user id is here in the createDefualtLists', userId);
  try {
    const productList = await List.create({
      owner: userId,
      name: 'My Products',
      isDefault: true,
    });

    const restaurantList = await RestaurantList.create({
      owner: userId,
      name: 'My Restaurants',
      isDefault: true,
    });

    return { productList, restaurantList };
  } catch (error) {
    // Log the error but don't stop the registration process.
    // This is an "after-the-fact" action.
    console.error(`Failed to create default lists for user ${userId}:`, error);
  }
};

export { createDefaultLists };
