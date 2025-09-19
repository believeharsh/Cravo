export const API = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/register',
    GOOGLE: '/auth/google',
    STATUS: '/auth/profile',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY_OTP: '/auth/verify',
  },

  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
  },

  RESTAURANTS: {
    RESTAURANTS_LIST: '/restaurants',
    DETAILS: id => `/restaurants/${id}`,
    PRODUCTS: restaurantId => `/restaurants/${restaurantId}/products`,
  },

  CITIES: {
    GET_ALL_CITIES: '/cities',
  },

  CATEGORIES: {
    GET_ALL_CATEGORIES: '/categories',
  },

  WISHLIST: {
    GET_ALL_PRODUCTS_LIST: '/lists/?populate=true',

    GET_ALL_RESTAURANTS_LIST: '/restaurantList/?populate=true',

    ADD_ITEM_TO_PRODUCT_LIST: product_list_id =>
      `/lists/${product_list_id}/add`,

    ADD_ITEM_TO_RESTAURANT_LIST: restaurant_list_id =>
      `/restaurantList/${restaurant_list_id}/add`,

    REMOVE_ITEM_FROM_PRODUCT_LIST: product_list_id =>
      `/lists/${product_list_id}/remove`,

    REMOVE_ITEM_FROM_RESTAURANT_LIST: restaurant_list_id =>
      `/restaurantList/${restaurant_list_id}/remove`,

    CREATE_NEW_PRODUCT_LIST: '/lists',
    TRANSFER_PRODUCT_FROM_LIST: '/lists/transfer',
  },
};
