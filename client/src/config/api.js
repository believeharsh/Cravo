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
};
