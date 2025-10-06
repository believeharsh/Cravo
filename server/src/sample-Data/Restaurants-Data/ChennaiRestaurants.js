// Base coordinates for Chennai (approx center)
const baseLat = 13.0827;
const baseLon = 80.2707;

const chennaiRestaurants = [
  {
    name: 'Murugan Idli Shop',
    description:
      'Legendary South Indian breakfast & lunch place, especially known for idli, dosa & filter coffee.',
    address: {
      street: '69, 2nd Cross Street, Royapettah',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zip_code: '600014',
      location: {
        type: 'Point',
        coordinates: [baseLon + 0.005, baseLat + 0.003],
      },
    },
    contact: { phone: '044-24651234', email: 'muruganidli@example.com' },
    cuisine_type: ['South-Indian', 'Breakfast', 'Lunch', 'Indian', 'Fast-Food'],
    rating: 4.4,
    numberOfReviews: 12000,
    opening_hours: [
      { day: 'Monday', open: '06:30', close: '22:00' },
      { day: 'Tuesday', open: '06:30', close: '22:00' },
    ],
    is_active: true,
    min_order_value: 100,
    delivery_radius_km: 5,
    is_veg: true,
    cost_for_two: 300,
    delivery_time_mins: 30,
  },

  {
    name: 'Annalakshmi Restaurant',
    description:
      'Vegetarian restaurant offering wholesome North & South Indian meals in a temple-style ambiance.',
    address: {
      street: '14, Sterling Road, Nungambakkam',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zip_code: '600034',
      location: {
        type: 'Point',
        coordinates: [baseLon - 0.004, baseLat + 0.002],
      },
    },
    contact: {
      phone: '044-28151234',
      email: 'annalakshmi.chennai@example.com',
    },
    cuisine_type: [
      'North-Indian',
      'South-Indian',
      'Indian',
      'Indian-Sweets',
      'Desserts',
    ],
    rating: 4.5,
    numberOfReviews: 8500,
    opening_hours: [
      { day: 'Tuesday', open: '11:00', close: '22:30' },
      { day: 'Wednesday', open: '11:00', close: '22:30' },
    ],
    is_active: true,
    min_order_value: 200,
    delivery_radius_km: 6,
    is_veg: true,
    cost_for_two: 800,
    delivery_time_mins: 40,
  },

  {
    name: 'Tuscana Pizzeria',
    description:
      'Fine Italian & wood-fired pizzas, pasta and a cozy ambience in Chennai.',
    address: {
      street: 'No. 10, 3rd Main Road, Adyar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zip_code: '600020',
      location: {
        type: 'Point',
        coordinates: [baseLon + 0.008, baseLat - 0.001],
      },
    },
    contact: { phone: '044-24451234', email: 'tuscana.chennai@example.com' },
    cuisine_type: ['Italian', 'Pizza', 'Desserts', 'Beverages'],
    rating: 4.3,
    numberOfReviews: 4500,
    opening_hours: [
      { day: 'Monday', open: '12:00', close: '23:00' },
      { day: 'Tuesday', open: '12:00', close: '23:00' },
    ],
    is_active: true,
    min_order_value: 400,
    delivery_radius_km: 7,
    is_veg: false,
    cost_for_two: 1200,
    delivery_time_mins: 45,
  },

  {
    name: 'House of Cheese',
    description:
      'Serves gourmet pizzas, sandwiches, burgers & shakes with a modern twist.',
    address: {
      street: 'MRC Nagar, Besant Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zip_code: '600090',
      location: {
        type: 'Point',
        coordinates: [baseLon + 0.01, baseLat - 0.004],
      },
    },
    contact: { phone: '044-24561234', email: 'houseofcheese@example.com' },
    cuisine_type: ['Pizza', 'Burgers', 'Sandwiches', 'Beverages', 'Fast-Food'],
    rating: 4.2,
    numberOfReviews: 3800,
    opening_hours: [
      { day: 'Wednesday', open: '11:30', close: '23:30' },
      { day: 'Thursday', open: '11:30', close: '23:30' },
    ],
    is_active: true,
    min_order_value: 250,
    delivery_radius_km: 8,
    is_veg: false,
    cost_for_two: 700,
    delivery_time_mins: 35,
  },

  {
    name: 'KooX Rooftop Asian Grill',
    description:
      'Trendy rooftop spot with Pan-Asian, sushi, Chinese, Japanese & BBQ offerings.',
    address: {
      street: '11, Pasumpon Muthuramalinga Thevar Rd, Nandanam',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zip_code: '600035',
      location: {
        type: 'Point',
        coordinates: [baseLon - 0.002, baseLat - 0.002],
      },
    },
    contact: { phone: '044-24351234', email: 'koox.chennai@example.com' },
    cuisine_type: ['Japanese', 'Sushi', 'Chinese', 'BBQ', 'Dinner'],
    rating: 4.4,
    numberOfReviews: 2900,
    opening_hours: [
      { day: 'Thursday', open: '17:00', close: '23:59' },
      { day: 'Friday', open: '17:00', close: '23:59' },
    ],
    is_active: true,
    min_order_value: 600,
    delivery_radius_km: 9,
    is_veg: false,
    cost_for_two: 1600,
    delivery_time_mins: 50,
  },

  {
    name: 'Ratna Café',
    description:
      'Classic South-Indian & breakfast café, famous for idli, dosa, filter coffee.',
    address: {
      street: '1, Triplicane High Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zip_code: '600005',
      location: {
        type: 'Point',
        coordinates: [baseLon - 0.006, baseLat + 0.001],
      },
    },
    contact: { phone: '044-25251234', email: 'ratnacafe@example.com' },
    cuisine_type: ['South-Indian', 'Breakfast', 'Lunch', 'Indian'],
    rating: 4.1,
    numberOfReviews: 11000,
    opening_hours: [
      { day: 'Monday', open: '06:00', close: '21:00' },
      { day: 'Tuesday', open: '06:00', close: '21:00' },
    ],
    is_active: true,
    min_order_value: 80,
    delivery_radius_km: 5,
    is_veg: true,
    cost_for_two: 250,
    delivery_time_mins: 30,
  },

  {
    name: 'Sandy’s Chocolate Laboratory',
    description:
      'Dessert heaven with ice creams, waffles, chocolate creations & beverages.',
    address: {
      street: '21, Guild Street, Nungambakkam',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zip_code: '600034',
      location: {
        type: 'Point',
        coordinates: [baseLon - 0.003, baseLat + 0.004],
      },
    },
    contact: { phone: '044-28151235', email: 'sandys@example.com' },
    cuisine_type: ['Desserts', 'Beverages'],
    rating: 4.5,
    numberOfReviews: 7200,
    opening_hours: [
      { day: 'Tuesday', open: '10:00', close: '23:00' },
      { day: 'Wednesday', open: '10:00', close: '23:00' },
    ],
    is_active: true,
    min_order_value: 150,
    delivery_radius_km: 6,
    is_veg: true,
    cost_for_two: 600,
    delivery_time_mins: 40,
  },

  {
    name: 'Green Leaf Salads & Bowls',
    description:
      'Healthy café offering salads, smoothie bowls, wraps, vegan & gluten free options.',
    address: {
      street: '88, OMR Road, Sholinganallur',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zip_code: '600119',
      location: {
        type: 'Point',
        coordinates: [baseLon + 0.02, baseLat - 0.01],
      },
    },
    contact: { phone: '044-66051234', email: 'greenleaf@example.com' },
    cuisine_type: ['Healthy', 'Vegan', 'Salads', 'Beverages', 'Lunch'],
    rating: 4.2,
    numberOfReviews: 2100,
    opening_hours: [
      { day: 'Monday', open: '08:00', close: '21:00' },
      { day: 'Tuesday', open: '08:00', close: '21:00' },
    ],
    is_active: true,
    min_order_value: 200,
    delivery_radius_km: 10,
    is_veg: true,
    cost_for_two: 700,
    delivery_time_mins: 45,
  },

  {
    name: 'Chennai Street Rolls',
    description:
      'Street-food style roll & wrap joint serving Indian, Mexican and fusion rolls.',
    address: {
      street: '45, T. Nagar Main Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zip_code: '600017',
      location: {
        type: 'Point',
        coordinates: [baseLon - 0.008, baseLat + 0.002],
      },
    },
    contact: { phone: '044-28171234', email: 'streetrolls@example.com' },
    cuisine_type: ['Street-Food', 'Indian', 'Mexican', 'Fast-Food'],
    rating: 4.0,
    numberOfReviews: 3000,
    opening_hours: [
      { day: 'Friday', open: '12:00', close: '23:00' },
      { day: 'Saturday', open: '12:00', close: '23:00' },
    ],
    is_active: true,
    min_order_value: 120,
    delivery_radius_km: 7,
    is_veg: false,
    cost_for_two: 350,
    delivery_time_mins: 30,
  },

  {
    name: 'Zen Chinese & Sushi',
    description:
      'Modern place for Chinese, sushi, soups and Asian fusion dinners.',
    address: {
      street: '20, Nungambakkam High Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zip_code: '600034',
      location: {
        type: 'Point',
        coordinates: [baseLon - 0.001, baseLat + 0.005],
      },
    },
    contact: { phone: '044-28156234', email: 'zenchennai@example.com' },
    cuisine_type: ['Chinese', 'Japanese', 'Sushi', 'Dinner', 'Soups'],
    rating: 4.3,
    numberOfReviews: 2800,
    opening_hours: [
      { day: 'Saturday', open: '12:00', close: '23:30' },
      { day: 'Sunday', open: '12:00', close: '23:30' },
    ],
    is_active: true,
    min_order_value: 500,
    delivery_radius_km: 8,
    is_veg: false,
    cost_for_two: 1300,
    delivery_time_mins: 45,
  },
];

export default chennaiRestaurants;
