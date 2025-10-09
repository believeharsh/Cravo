// Base coordinates for Kochi (approx center)
const baseLat = 9.9312;
const baseLon = 76.2673;

const kochiRestaurants = [
  // {
  //   name: 'Dhe Puttu',
  //   description:
  //     'Specialty eatery serving authentic Kerala breakfast & rice-based dishes, especially puttu and appam.',
  //   address: {
  //     street: 'Sasthamangalam Road, Fort Kochi',
  //     city: 'Kochi',
  //     state: 'Kerala',
  //     zip_code: '682001',
  //     location: {
  //       type: 'Point',
  //       coordinates: [baseLon + 0.002, baseLat + 0.004],
  //     },
  //   },
  //   contact: { phone: '0484-1234567', email: 'dheputtu@example.com' },
  //   cuisine_type: [
  //     'South-Indian',
  //     'Breakfast',
  //     'Indian',
  //     'Vegetarian',
  //     'Fast-Food',
  //   ],
  //   rating: 4.5,
  //   numberOfReviews: 5200,
  //   opening_hours: [
  //     { day: 'Monday', open: '07:00', close: '15:00' },
  //     { day: 'Tuesday', open: '07:00', close: '15:00' },
  //   ],
  //   is_active: true,
  //   min_order_value: 100,
  //   delivery_radius_km: 5,
  //   is_veg: true,
  //   cost_for_two: 300,
  //   delivery_time_mins: 30,
  // },

  // {
  //   name: 'Fusion Bay',
  //   description:
  //     'Coastal location offering Kerala seafood, Indian & BBQ dinner by the shore.',
  //   address: {
  //     street: 'Marine Drive, Kochi',
  //     city: 'Kochi',
  //     state: 'Kerala',
  //     zip_code: '682011',
  //     location: {
  //       type: 'Point',
  //       coordinates: [baseLon, baseLat + 0.007],
  //     },
  //   },
  //   contact: { phone: '0484-2345678', email: 'fusionbay@example.com' },
  //   cuisine_type: ['Indian', 'BBQ', 'Dinner', 'Seafood', 'Lunch'],
  //   rating: 4.4,
  //   numberOfReviews: 3800,
  //   opening_hours: [
  //     { day: 'Thursday', open: '12:00', close: '23:00' },
  //     { day: 'Friday', open: '12:00', close: '23:59' },
  //   ],
  //   is_active: true,
  //   min_order_value: 400,
  //   delivery_radius_km: 8,
  //   is_veg: false,
  //   cost_for_two: 1500,
  //   delivery_time_mins: 50,
  // },

  // {
  //   name: 'Kayees Biryani',
  //   description:
  //     'Legendary biryani spot in Mattancherry, with flaky parotta, mutton biryani & masala meals.',
  //   address: {
  //     street: 'Queen’s Road, Mattancherry',
  //     city: 'Kochi',
  //     state: 'Kerala',
  //     zip_code: '682002',
  //     location: {
  //       type: 'Point',
  //       coordinates: [baseLon + 0.003, baseLat - 0.002],
  //     },
  //   },
  //   contact: { phone: '0484-3456789', email: 'kayees@example.com' },
  //   cuisine_type: ['Indian', 'Lunch', 'Dinner', 'Fast-Food', 'BBQ'],
  //   rating: 4.2,
  //   numberOfReviews: 9000,
  //   opening_hours: [
  //     { day: 'Monday', open: '11:00', close: '23:00' },
  //     { day: 'Sunday', open: '11:00', close: '23:00' },
  //   ],
  //   is_active: true,
  //   min_order_value: 200,
  //   delivery_radius_km: 7,
  //   is_veg: false,
  //   cost_for_two: 800,
  //   delivery_time_mins: 45,
  // },

  // {
  //   name: 'The Rice Boat – Vivanta',
  //   description:
  //     'Luxury restaurant with seafood & Kerala fish specials in a deck-style ambiance.',
  //   address: {
  //     street: 'Race Course, Kochi',
  //     city: 'Kochi',
  //     state: 'Kerala',
  //     zip_code: '682035',
  //     location: {
  //       type: 'Point',
  //       coordinates: [baseLon - 0.005, baseLat + 0.005],
  //     },
  //   },
  //   contact: { phone: '0484-4567890', email: 'riceboat@example.com' },
  //   cuisine_type: ['Indian', 'Dinner', 'BBQ', 'Seafood'],
  //   rating: 4.6,
  //   numberOfReviews: 3100,
  //   opening_hours: [
  //     { day: 'Thursday', open: '18:30', close: '23:30' },
  //     { day: 'Friday', open: '18:30', close: '23:30' },
  //   ],
  //   is_active: true,
  //   min_order_value: 1000,
  //   delivery_radius_km: 10,
  //   is_veg: false,
  //   cost_for_two: 2000,
  //   delivery_time_mins: 60,
  // },

  {
    name: 'Kashi Art Cafe',
    description:
      'Bohemian café in Fort Kochi offering sandwiches, desserts, beverages & breakfast specials.',
    address: {
      street: 'Princess Street, Fort Kochi',
      city: 'Kochi',
      state: 'Kerala',
      zip_code: '682001',
      location: {
        type: 'Point',
        coordinates: [baseLon + 0.004, baseLat + 0.006],
      },
    },
    contact: { phone: '0484-5678901', email: 'kashiart@example.com' },
    cuisine_type: [
      'Breakfast',
      'Desserts',
      'Sandwiches',
      'Beverages',
      'Healthy',
    ],
    rating: 4.3,
    numberOfReviews: 2700,
    opening_hours: [
      { day: 'Tuesday', open: '08:00', close: '20:00' },
      { day: 'Wednesday', open: '08:00', close: '20:00' },
    ],
    is_active: true,
    min_order_value: 150,
    delivery_radius_km: 5,
    is_veg: false,
    cost_for_two: 600,
    delivery_time_mins: 30,
  },

  {
    name: 'Dadu’s Bistro',
    description:
      'Italian & continental eatery; pizzas, pastas, salads & soups in a cosy setting.',
    address: {
      street: 'Lulu International Shopping Mall, Edappally',
      city: 'Kochi',
      state: 'Kerala',
      zip_code: '682024',
      location: {
        type: 'Point',
        coordinates: [baseLon + 0.02, baseLat + 0.01],
      },
    },
    contact: { phone: '0484-6789012', email: 'dadus@example.com' },
    cuisine_type: ['Italian', 'Pizza', 'Salads', 'Soups', 'Dinner'],
    rating: 4.4,
    numberOfReviews: 4200,
    opening_hours: [
      { day: 'Monday', open: '11:30', close: '22:30' },
      { day: 'Saturday', open: '12:00', close: '23:00' },
    ],
    is_active: true,
    min_order_value: 350,
    delivery_radius_km: 8,
    is_veg: false,
    cost_for_two: 1300,
    delivery_time_mins: 40,
  },

  {
    name: 'Burger Junction',
    description: 'Fast-food joint specializing in burgers, fries & shakes.',
    address: {
      street: 'MG Road, Kochi',
      city: 'Kochi',
      state: 'Kerala',
      zip_code: '682011',
      location: {
        type: 'Point',
        coordinates: [baseLon - 0.002, baseLat - 0.003],
      },
    },
    contact: { phone: '0484-7890123', email: 'burgerjunction@example.com' },
    cuisine_type: ['Burgers', 'Fast-Food', 'Lunch', 'Dinner'],
    rating: 4.0,
    numberOfReviews: 3500,
    opening_hours: [
      { day: 'Friday', open: '11:00', close: '23:00' },
      { day: 'Saturday', open: '11:00', close: '23:30' },
    ],
    is_active: true,
    min_order_value: 150,
    delivery_radius_km: 6,
    is_veg: false,
    cost_for_two: 500,
    delivery_time_mins: 35,
  },

  {
    name: 'The Vegan Vessel',
    description:
      '100% vegan kitchen offering plant-based bowls, wraps, smoothies & salads.',
    address: {
      street: 'Palarivattom, Kochi',
      city: 'Kochi',
      state: 'Kerala',
      zip_code: '682025',
      location: {
        type: 'Point',
        coordinates: [baseLon + 0.015, baseLat - 0.005],
      },
    },
    contact: { phone: '0484-8901234', email: 'veganvessel@example.com' },
    cuisine_type: ['Vegan', 'Healthy', 'Salads', 'Beverages', 'Lunch'],
    rating: 4.5,
    numberOfReviews: 2400,
    opening_hours: [
      { day: 'Monday', open: '10:00', close: '21:00' },
      { day: 'Tuesday', open: '10:00', close: '21:00' },
    ],
    is_active: true,
    min_order_value: 200,
    delivery_radius_km: 7,
    is_veg: true,
    cost_for_two: 800,
    delivery_time_mins: 40,
  },

  {
    name: 'Szechuan Spice',
    description:
      'Chinese & Asian cuisines: dim sums, noodles, soups, dinner menu with spice.',
    address: {
      street: 'Kaloor Junction, Kochi',
      city: 'Kochi',
      state: 'Kerala',
      zip_code: '682017',
      location: {
        type: 'Point',
        coordinates: [baseLon + 0.005, baseLat - 0.006],
      },
    },
    contact: { phone: '0484-9012345', email: 'szechuan@example.com' },
    cuisine_type: ['Chinese', 'Soups', 'Lunch', 'Dinner', 'Asian'],
    rating: 4.2,
    numberOfReviews: 3200,
    opening_hours: [
      { day: 'Wednesday', open: '12:00', close: '23:00' },
      { day: 'Thursday', open: '12:00', close: '23:00' },
    ],
    is_active: true,
    min_order_value: 300,
    delivery_radius_km: 8,
    is_veg: false,
    cost_for_two: 1000,
    delivery_time_mins: 45,
  },

  {
    name: 'Sweet Karma',
    description:
      'Dessert parlour with Indian sweets, fusion desserts, beverages & ice creams.',
    address: {
      street: 'Lulu Mall, Edappally',
      city: 'Kochi',
      state: 'Kerala',
      zip_code: '682024',
      location: {
        type: 'Point',
        coordinates: [baseLon + 0.018, baseLat + 0.008],
      },
    },
    contact: { phone: '0484-0123456', email: 'sweetkarma@example.com' },
    cuisine_type: ['Desserts', 'Beverages', 'Indian-Sweets'],
    rating: 4.4,
    numberOfReviews: 4800,
    opening_hours: [
      { day: 'Saturday', open: '10:00', close: '22:00' },
      { day: 'Sunday', open: '10:00', close: '22:00' },
    ],
    is_active: true,
    min_order_value: 100,
    delivery_radius_km: 6,
    is_veg: true,
    cost_for_two: 500,
    delivery_time_mins: 35,
  },
];

export default kochiRestaurants;
