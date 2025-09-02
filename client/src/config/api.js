export const API = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    GOOGLE: '/auth/google',
    STATUS: '/auth/profile',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
  },
  RESTAURANTS: {
    LIST: '/restaurants',
    DETAILS: id => `/restaurants/${id}`,
    PRODUCTS: restaurantId => `/restaurants/${restaurantId}/products`,
  },
  LANDING: {
    LANDING_RESOURCES: '/landingResources',
  },
};
