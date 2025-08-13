// Base coordinates for Indore (approximate center)
const baseLat = 22.7196;
const baseLon = 75.8577;

export const restaurants = [
  {
      name: 'Maame Da Dhaba',
      description: 'Authentic North Indian cuisine with a modern twist.',
      address: {
          street: '10 AB Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.02, baseLat + 0.01] }
      },
      contact: { phone: '9876543210', email: 'maamedadhaba@example.com' },
      cuisine_type: ['Indian', 'North Indian', 'Lunch', 'Dinner'],
      rating: 4.5, numberOfReviews: 1500,
      opening_hours: [{ day: 'Monday', open: '11:00', close: '23:00' }],
      is_active: true, min_order_value: 200, delivery_radius_km: 5,
      is_veg: false, cost_for_two: 600, delivery_time_mins: 35,
      imagePath: 'https://media.istockphoto.com/id/889605874/photo/lamb-korma-curry-inside-karahi-indian-serving-dishes-north-indian-food.jpg?s=612x612&w=0&k=20&c=esAlk0l1emtL-_gcuwgU4rvbRVb24k7UiQqrgnDAJKs='
  },
  {
      name: 'SK Pizza Wala',
      description: 'Freshly baked Neapolitan pizzas and Italian pasta.',
      address: {
          street: '25 Palasia Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.03, baseLat - 0.01] }
      },
      contact: { phone: '9988776655', email: 'skpizzawala@example.com' },
      cuisine_type: ['Italian', 'Pizza', 'Fast-Food', 'Lunch', 'Dinner'],
      rating: 4.8, numberOfReviews: 2000,
      opening_hours: [{ day: 'Tuesday', open: '12:00', close: '22:00' }],
      is_active: true, min_order_value: 180, delivery_radius_km: 7,
      is_veg: false, cost_for_two: 750, delivery_time_mins: 40,
      imagePath: 'https://media.istockphoto.com/id/1171008705/photo/italian-pizza-margherita.jpg?s=612x612&w=0&k=20&c=J1i7bbbex7tk3FXs8W-hd9Yf9ZxnsE5C36O92Z3zcoM='
  },
  {
      name: 'The Burger Hub',
      description: 'Gourmet burgers and shakes for every craving.',
      address: {
          street: 'Bhawarkua Main Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.01, baseLat - 0.03] }
      },
      contact: { phone: '9123456789', email: 'burgerhub@example.com' },
      cuisine_type: ['Fast-Food', 'Burgers', 'Lunch', 'Dinner'],
      rating: 4.2, numberOfReviews: 800,
      opening_hours: [{ day: 'Wednesday', open: '10:00', close: '22:00' }],
      is_active: true, min_order_value: 150, delivery_radius_km: 6,
      is_veg: false, cost_for_two: 500, delivery_time_mins: 25,
      imagePath: 'https://media.istockphoto.com/id/1302436326/photo/junk-food-homemade-beef-burgers-on-vintage-wooden-background.jpg?s=612x612&w=0&k=20&c=NsyDE31unoNd80wGfrkMOqvsnjeNOpHER-yL_8KwcRw='
  },
  {
      name: 'Chopstix Express',
      description: 'Quick and delicious Chinese stir-fries and noodles.',
      address: {
          street: 'Rajendra Nagar', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.03, baseLat - 0.01] }
      },
      contact: { phone: '9765432109', email: 'chopstix@example.com' },
      cuisine_type: ['Chinese', 'Asian', 'Lunch', 'Dinner'],
      rating: 4.0, numberOfReviews: 600,
      opening_hours: [{ day: 'Thursday', open: '11:30', close: '22:30' }],
      is_active: true, min_order_value: 220, delivery_radius_km: 4,
      is_veg: false, cost_for_two: 450, delivery_time_mins: 30,
      imagePath: 'https://media.istockphoto.com/id/483137365/photo/asian-chow-mein-noodles.jpg?s=612x612&w=0&k=20&c=aVkPKpDkiAM7CxTFinQBax0i-nm-ybzWimrJRyPePcg='
  },
  {
      name: 'Sweet Tooth Cafe',
      description: 'Delightful desserts, pastries, and coffee.',
      address: {
          street: 'Vijay Nagar Square', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.04, baseLat + 0.02] }
      },
      contact: { phone: '9654321098', email: 'sweettooth@example.com' },
      cuisine_type: ['Desserts', 'Cafe', 'Beverages', 'Breakfast'],
      rating: 4.7, numberOfReviews: 1200,
      opening_hours: [{ day: 'Friday', open: '09:00', close: '21:00' }],
      is_active: true, min_order_value: 100, delivery_radius_km: 8,
      is_veg: true, cost_for_two: 300, delivery_time_mins: 20,
      imagePath: 'https://media.istockphoto.com/id/952117426/photo/bakery-products.jpg?s=612x612&w=0&k=20&c=XQQ_Ue1kW28EdaFLlj3E0updE6TXuyHRWAhU4Yvk8Ds='
  },
  {
      name: 'Healthy Bites',
      description: 'Fresh salads, healthy wraps, and smoothies.',
      address: {
          street: 'Silicon City', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.04, baseLat - 0.02] }
      },
      contact: { phone: '9543210987', email: 'healthybites@example.com' },
      cuisine_type: ['Healthy', 'Salads', 'Soups', 'Breakfast', 'Lunch'],
      rating: 4.4, numberOfReviews: 750,
      opening_hours: [{ day: 'Saturday', open: '09:30', close: '20:30' }],
      is_active: true, min_order_value: 170, delivery_radius_km: 7,
      is_veg: true, cost_for_two: 400, delivery_time_mins: 30,
      imagePath: 'https://media.istockphoto.com/id/1075446340/photo/various-fresh-mix-salad-leaves-with-tomato-in-bowl-on-wooden-background.jpg?s=612x612&w=0&k=20&c=cqEZGpIBYfmLJhkpA2shK6t2P55k7fQPdvXFI146WGY='
  },
  {
      name: 'Grill & Chill',
      description: 'Delicious grilled sandwiches and refreshing beverages.',
      address: {
          street: 'L.I.G. Colony', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.02, baseLat + 0.03] }
      },
      contact: { phone: '9432109876', email: 'grillnchill@example.com' },
      cuisine_type: ['Sandwiches', 'BBQ', 'Lunch'],
      rating: 4.1, numberOfReviews: 400,
      opening_hours: [{ day: 'Sunday', open: '10:30', close: '21:30' }],
      is_active: true, min_order_value: 120, delivery_radius_km: 6,
      is_veg: false, cost_for_two: 350, delivery_time_mins: 25,
      imagePath: 'https://media.istockphoto.com/id/2181353563/photo/left-over-roast-turkey-and-swiss-sandwich.jpg?s=612x612&w=0&k=20&c=Vp8FbwGPjjdu2Vt-X_cV-6W8IU8XDtQSKEH9DpivDNU='
  },
  {
      name: 'Coffee & Books',
      description: 'Cozy cafe with great coffee and light bites.',
      address: {
          street: 'Sapna Sangeeta Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.01, baseLat + 0.04] }
      },
      contact: { phone: '9321098765', email: 'coffeeandbooks@example.com' },
      cuisine_type: ['Cafe', 'Breakfast', 'Beverages'],
      rating: 4.6, numberOfReviews: 1000,
      opening_hours: [{ day: 'Monday', open: '08:00', close: '20:00' }],
      is_active: true, min_order_value: 80, delivery_radius_km: 5,
      is_veg: true, cost_for_two: 250, delivery_time_mins: 20,
      imagePath: 'https://www.shutterstock.com/image-photo/indian-masala-chai-tea-traditional-600nw-2044313834.jpg'
  },
  {
      name: 'Biryani Palace',
      description: 'Exquisite biryanis and kebabs.',
      address: {
          street: 'Geeta Bhawan', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.005, baseLat + 0.005] }
      },
      contact: { phone: '9210987654', email: 'biryanipalace@example.com' },
      cuisine_type: ['Indian', 'Biryani', 'Lunch', 'Dinner'],
      rating: 4.3, numberOfReviews: 900,
      opening_hours: [{ day: 'Tuesday', open: '12:00', close: '23:00' }],
      is_active: true, min_order_value: 250, delivery_radius_km: 6,
      is_veg: false, cost_for_two: 550, delivery_time_mins: 45,
      imagePath: 'https://media.istockphoto.com/id/469866881/photo/mutton-gosht-biryani.jpg?s=612x612&w=0&k=20&c=FH6dExVNp_hb9JtJCyGrmKAhPJwQo3UdlMC6gHCbVLg='
  },
  {
      name: 'Dosa Hut',
      description: 'Crispy dosas and South Indian specialties.',
      address: {
          street: 'Scheme No. 54', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.015, baseLat - 0.015] }
      },
      contact: { phone: '9109876543', email: 'dosahut@example.com' },
      cuisine_type: ['Indian', 'South Indian', 'Breakfast'],
      rating: 4.0, numberOfReviews: 500,
      opening_hours: [{ day: 'Wednesday', open: '09:00', close: '22:00' }],
      is_active: true, min_order_value: 100, delivery_radius_km: 4,
      is_veg: true, cost_for_two: 300, delivery_time_mins: 25,
      imagePath: 'https://media.istockphoto.com/id/2194547589/photo/south-indian-breakfast-dosa.jpg?s=612x612&w=0&k=20&c=1hCR2OqlNDYrY4nkJD3Avx4tOASsZN7v9aZsAE6lE4o='
  },
  {
      name: 'El Fuego Mexican Grill',
      description: 'Spicy Mexican tacos, burritos, and quesadillas.',
      address: {
          street: 'New Palasia Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.025, baseLat - 0.025] }
      },
      contact: { phone: '9112233445', email: 'elfuego@example.com' },
      cuisine_type: ['Mexican', 'Fast-Food'],
      rating: 4.6, numberOfReviews: 700,
      opening_hours: [{ day: 'Monday', open: '12:00', close: '23:00' }],
      is_active: true, min_order_value: 200, delivery_radius_km: 8,
      is_veg: false, cost_for_two: 600, delivery_time_mins: 35,
      imagePath: 'https://media.istockphoto.com/id/1306269607/photo/close-up-of-a-lime-being-squeezed-in-a-mexican-taco-with-traditional-colorful-background.jpg?s=612x612&w=0&k=20&c=mQze61JPel47XeEiXzScLAq1pZqE0NjY9JzF0dv6Jkw='
  },
  {
      name: 'Green Leaf Vegan Cafe',
      description: 'Purely vegan and organic meals for a healthy lifestyle.',
      address: {
          street: 'Sudama Nagar Main Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.035, baseLat + 0.015] }
      },
      contact: { phone: '9113344556', email: 'greenleaf@example.com' },
      cuisine_type: ['Vegan', 'Healthy', 'Salads', 'Soups', 'Breakfast', 'Lunch'],
      rating: 4.9, numberOfReviews: 1100,
      opening_hours: [{ day: 'Wednesday', open: '09:00', close: '21:00' }],
      is_active: true, min_order_value: 150, delivery_radius_km: 7,
      is_veg: true, cost_for_two: 500, delivery_time_mins: 30,
      imagePath: 'https://t4.ftcdn.net/jpg/01/72/47/03/360_F_172470354_mSuvpVX0knZYGYbozjkUgqpjPwwpdfZF.jpg'
  },
  {
      name: 'The Sushi Bar',
      description: 'Freshly prepared sushi and authentic Japanese rolls.',
      address: {
          street: 'Scheme No. 78', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.015, baseLat + 0.015] }
      },
      contact: { phone: '9114455667', email: 'sushibar@example.com' },
      cuisine_type: ['Sushi', 'Asian', 'Dinner'],
      rating: 4.7, numberOfReviews: 950,
      opening_hours: [{ day: 'Thursday', open: '18:00', close: '00:00' }],
      is_active: true, min_order_value: 300, delivery_radius_km: 10,
      is_veg: false, cost_for_two: 1200, delivery_time_mins: 50,
      imagePath: 'https://media.istockphoto.com/id/508032520/photo/sushi-set-nigiri-and-sashimi-with-tea.jpg?s=612x612&w=0&k=20&c=-gNB5bYMSTumWI9D09XPcVuYEsuLxkVuJKUdp-2vGIc='
  },
  {
      name: 'Mama\'s BBQ Joint',
      description: 'Classic American BBQ with smoky ribs and chicken.',
      address: {
          street: 'Race Course Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.01, baseLat - 0.03] }
      },
      contact: { phone: '9115566778', email: 'mamasbbq@example.com' },
      cuisine_type: ['BBQ', 'American', 'Dinner', 'Lunch'],
      rating: 4.4, numberOfReviews: 600,
      opening_hours: [{ day: 'Friday', open: '12:00', close: '23:00' }],
      is_active: true, min_order_value: 250, delivery_radius_km: 9,
      is_veg: false, cost_for_two: 800, delivery_time_mins: 40,
      imagePath: 'https://media.istockphoto.com/id/531464366/photo/beef-steaks-on-the-grill.jpg?s=612x612&w=0&k=20&c=gP5ViGnJ08YTzXthSOMKzZEMqtAbcM2jhEao09W1kAQ='
  },
  {
      name: 'The Panini Place',
      description: 'Artisanal sandwiches and gourmet paninis.',
      address: {
          street: 'AB Road, near C21 Mall', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.04, baseLat - 0.005] }
      },
      contact: { phone: '9012345678', email: 'paniniplace@example.com' },
      cuisine_type: ['Sandwiches', 'Cafe', 'Lunch'],
      rating: 4.3, numberOfReviews: 350,
      opening_hours: [{ day: 'Saturday', open: '11:00', close: '21:00' }],
      is_active: true, min_order_value: 100, delivery_radius_km: 5,
      is_veg: true, cost_for_two: 400, delivery_time_mins: 20,
      imagePath: 'https://media.istockphoto.com/id/157647007/photo/panini-sandwiches.jpg?s=612x612&w=0&k=20&c=zui410-M0L0NvLB4KKE-B1stSZDjRw8FSe2Xi1yOwEA='
  },
  {
      name: 'The Wok Master',
      description: 'Customizable stir-fry bowls and authentic Asian street food.',
      address: {
          street: 'Malhar Mall Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.01, baseLat + 0.02] }
      },
      contact: { phone: '9123456780', email: 'wokmaster@example.com' },
      cuisine_type: ['Chinese', 'Asian', 'Fast-Food'],
      rating: 4.6, numberOfReviews: 1100,
      opening_hours: [{ day: 'Sunday', open: '12:00', close: '22:00' }],
      is_active: true, min_order_value: 250, delivery_radius_km: 7,
      is_veg: false, cost_for_two: 500, delivery_time_mins: 30,
      imagePath: 'https://www.shutterstock.com/image-photo/asian-cuisine-stir-fried-chicken-600nw-2330854893.jpg'
  },
  {
      name: 'The Cheesy Corner',
      description: 'Indulgent pasta dishes and cheesy garlic bread.',
      address: {
          street: 'Scheme No. 114', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.05, baseLat + 0.03] }
      },
      contact: { phone: '9234567890', email: 'cheesycorner@example.com' },
      cuisine_type: ['Italian', 'Pasta', 'Dinner'],
      rating: 4.1, numberOfReviews: 500,
      opening_hours: [{ day: 'Monday', open: '13:00', close: '23:00' }],
      is_active: true, min_order_value: 200, delivery_radius_km: 6,
      is_veg: true, cost_for_two: 600, delivery_time_mins: 35,
      imagePath: 'https://media.istockphoto.com/id/1352856480/photo/italian-dishes-for-family-dinner.jpg?s=612x612&w=0&k=20&c=Lh-hcYnHGOIoM9Q1nPXiVHuEVsQVpsxezLYfz_FLby0='
  },
  {
      name: 'Bombay Kulfi & Falooda',
      description: 'Traditional Indian kulfi and creamy falooda.',
      address: {
          street: 'Sarafa Bazaar', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.005, baseLat - 0.005] }
      },
      contact: { phone: '9345678901', email: 'bombaykulfi@example.com' },
      cuisine_type: ['Indian', 'Desserts', 'Beverages'],
      rating: 4.8, numberOfReviews: 2500,
      opening_hours: [{ day: 'Tuesday', open: '18:00', close: '02:00' }],
      is_active: true, min_order_value: 80, delivery_radius_km: 3,
      is_veg: true, cost_for_two: 150, delivery_time_mins: 15,
      imagePath: 'https://media.istockphoto.com/id/657073780/photo/rajwari-or-rajwadi-sweet-kesar-badam-pista-kulfi-or-ice-cream-candy.jpg?s=612x612&w=0&k=20&c=cXhI8hVEhYc5inbPXt-YWbUYjlJlGC2TdRd_Xkn56Ig='
  },
  {
      name: 'The Brew & Grind',
      description: 'Artisan coffee, cold brews, and fresh pastries.',
      address: {
          street: 'Press Complex', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.035, baseLat + 0.035] }
      },
      contact: { phone: '9456789012', email: 'brewandgrind@example.com' },
      cuisine_type: ['Cafe', 'Beverages', 'Breakfast', 'Desserts'],
      rating: 4.5, numberOfReviews: 850,
      opening_hours: [{ day: 'Wednesday', open: '08:00', close: '22:00' }],
      is_active: true, min_order_value: 100, delivery_radius_km: 6,
      is_veg: true, cost_for_two: 300, delivery_time_mins: 20,
      imagePath: 'https://media.istockphoto.com/id/1209718260/photo/cold-brew-coffee-with-milk-and-ice-cubes-in-glass.jpg?s=612x612&w=0&k=20&c=ZJRnsNhnEwHPvt6-EsU2dJmNhi2hmdFq-_w56YbR648='
  },
  {
      name: 'Sagar Ratna',
      description: 'Authentic South Indian vegetarian food.',
      address: {
          street: 'MG Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.02, baseLat - 0.02] }
      },
      contact: { phone: '9567890123', email: 'sagar.ratna@example.com' },
      cuisine_type: ['Indian', 'South Indian', 'Breakfast', 'Lunch', 'Dinner'],
      rating: 4.2, numberOfReviews: 1800,
      opening_hours: [{ day: 'Thursday', open: '08:30', close: '22:30' }],
      is_active: true, min_order_value: 150, delivery_radius_km: 5,
      is_veg: true, cost_for_two: 400, delivery_time_mins: 30,
      imagePath: 'https://st2.depositphotos.com/5653638/11789/i/450/depositphotos_117893206-stock-photo-food-south-indian-food-idli.jpg'
  },
  {
      name: 'Burger Singh',
      description: 'Indian-inspired burgers and fusion sides.',
      address: {
          street: 'New Palasia, Sector B', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.015, baseLat - 0.015] }
      },
      contact: { phone: '9678901234', email: 'burgersingh@example.com' },
      cuisine_type: ['Burgers', 'Indian', 'Fast-Food'],
      rating: 4.4, numberOfReviews: 1300,
      opening_hours: [{ day: 'Friday', open: '11:00', close: '00:00' }],
      is_active: true, min_order_value: 120, delivery_radius_km: 7,
      is_veg: false, cost_for_two: 450, delivery_time_mins: 25,
      imagePath: 'https://media.istockphoto.com/id/1498243668/photo/tasty-cheeseburger-with-lettuce-cheddar-cheese-tomato-and-pickles-burger-bun-with-sesame.jpg?s=612x612&w=0&k=20&c=m2fYc-3o7yjL2qUVxxKlGkniKYIw5qh7gaSdagUNSbU='
  },
  {
      name: 'The Salad Factory',
      description: 'Create your own fresh and healthy salads and bowls.',
      address: {
          street: 'Lalbagh Palace Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.03, baseLat + 0.02] }
      },
      contact: { phone: '9789012345', email: 'saladfactory@example.com' },
      cuisine_type: ['Salads', 'Healthy', 'Lunch'],
      rating: 4.7, numberOfReviews: 600,
      opening_hours: [{ day: 'Saturday', open: '10:30', close: '20:30' }],
      is_active: true, min_order_value: 150, delivery_radius_km: 8,
      is_veg: true, cost_for_two: 350, delivery_time_mins: 20,
      imagePath: 'https://media.istockphoto.com/id/598567824/photo/homemade-autumn-apple-walnut-spinach-salad.jpg?s=612x612&w=0&k=20&c=EjFr4J0xf5a4TN-uxfR2Uez_TC4iC-R2FDT5-5FTGi4='
  },
  {
      name: 'The Pasta Bowl Co.',
      description: 'Authentic Italian pasta made with fresh ingredients.',
      address: {
          street: 'Race Course Road, near City Center', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.02, baseLat - 0.025] }
      },
      contact: { phone: '9890123456', email: 'pastabowlco@example.com' },
      cuisine_type: ['Italian', 'Pasta', 'Dinner'],
      rating: 4.5, numberOfReviews: 900,
      opening_hours: [{ day: 'Sunday', open: '12:00', close: '22:00' }],
      is_active: true, min_order_value: 200, delivery_radius_km: 7,
      is_veg: true, cost_for_two: 650, delivery_time_mins: 30,
      imagePath: 'https://media.istockphoto.com/id/488960908/photo/homemade-pasta.jpg?s=612x612&w=0&k=20&c=PHYysjDSuwh9D0KYNTqaoAdBD9ho7ksC72oweIjT0dE='
  },
  {
      name: 'Bake House',
      description: 'Freshly baked breads, cakes, and coffee.',
      address: {
          street: 'Vijay Nagar, Scheme 54', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.045, baseLat + 0.045] }
      },
      contact: { phone: '9901234567', email: 'bakehouse@example.com' },
      cuisine_type: ['Bakery', 'Desserts', 'Beverages', 'Breakfast'],
      rating: 4.9, numberOfReviews: 1500,
      opening_hours: [{ day: 'Monday', open: '07:00', close: '21:00' }],
      is_active: true, min_order_value: 100, delivery_radius_km: 6,
      is_veg: true, cost_for_two: 250, delivery_time_mins: 20,
      imagePath: 'https://media.istockphoto.com/id/1226706032/photo/fresh-bread.jpg?s=612x612&w=0&k=20&c=WfVKQHRBKVBdxGWLnsilQFROIWtH-LYMtMpuhL3UVog='
  },
  {
      name: 'The Grand Wok',
      description: 'Fine dining Chinese and pan-Asian cuisine.',
      address: {
          street: 'South Tukoganj, near Treasure Island', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.01, baseLat - 0.01] }
      },
      contact: { phone: '9112233446', email: 'grandwok@example.com' },
      cuisine_type: ['Chinese', 'Asian', 'Dinner'],
      rating: 4.3, numberOfReviews: 1000,
      opening_hours: [{ day: 'Tuesday', open: '12:00', close: '23:00' }],
      is_active: true, min_order_value: 300, delivery_radius_km: 8,
      is_veg: false, cost_for_two: 900, delivery_time_mins: 40,
      imagePath: 'https://media.istockphoto.com/id/629615460/photo/tasty-and-hot-chinese-dumplings-in-wooden-bowl.jpg?s=612x612&w=0&k=20&c=12kDZ3M_i1Jat6N8GEAiuVsUrJ4N-lfFGmA9PJoJwac='
  },
  {
      name: 'Healthy Hub',
      description: 'Customizable meal plans and healthy bowls.',
      address: {
          street: 'Navlakha Square', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.04, baseLat + 0.005] }
      },
      contact: { phone: '9113344557', email: 'healthyhub@example.com' },
      cuisine_type: ['Healthy', 'Salads', 'Lunch'],
      rating: 4.6, numberOfReviews: 400,
      opening_hours: [{ day: 'Wednesday', open: '10:00', close: '20:00' }],
      is_active: true, min_order_value: 180, delivery_radius_km: 6,
      is_veg: true, cost_for_two: 400, delivery_time_mins: 25,
      imagePath: 'https://t4.ftcdn.net/jpg/12/65/31/61/360_F_1265316197_aROGVjdSjMhIffQuvagExL3KAQBezxdN.jpg'
  },
  {
      name: 'The Soup Kitchen',
      description: 'Hearty and fresh soups, stews, and bread.',
      address: {
          street: 'Ring Road, near Velocity', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.03, baseLat - 0.03] }
      },
      contact: { phone: '9114455668', email: 'soupkitchen@example.com' },
      cuisine_type: ['Soups', 'Healthy', 'Lunch', 'Dinner'],
      rating: 4.1, numberOfReviews: 300,
      opening_hours: [{ day: 'Thursday', open: '11:00', close: '22:00' }],
      is_active: true, min_order_value: 120, delivery_radius_km: 7,
      is_veg: true, cost_for_two: 300, delivery_time_mins: 25,
      imagePath: 'https://media.istockphoto.com/id/518145080/photo/minestrone-soup-on-the-pot.jpg?s=612x612&w=0&k=20&c=sKroe1_2X3pE-h4gzgL8J7f3wHfAOtw8msbjndmO8H4='
  },
  {
      name: 'The BBQ Shack',
      description: 'Smoky, slow-cooked BBQ and grilled meats.',
      address: {
          street: 'Vijay Nagar, behind Sayaji Hotel', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.04, baseLat + 0.01] }
      },
      contact: { phone: '9115566779', email: 'bbqshack@example.com' },
      cuisine_type: ['BBQ', 'Dinner'],
      rating: 4.6, numberOfReviews: 800,
      opening_hours: [{ day: 'Friday', open: '18:00', close: '01:00' }],
      is_active: true, min_order_value: 300, delivery_radius_km: 10,
      is_veg: false, cost_for_two: 1000, delivery_time_mins: 45,
      imagePath: 'https://media.istockphoto.com/id/1222826834/photo/assorted-delicious-grilled-meat-with-vegetables-on-barbecue-isolated-on-black-background.jpg?s=612x612&w=0&k=20&c=VBIKLG2K9P_PJDHi4qadfYvWZe9KP5_cUwQUDFgubTU='
  },
  {
      name: 'Taco Fiesta',
      description: 'Authentic Mexican flavors with a modern twist.',
      address: {
          street: 'Scheme No. 140', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.05, baseLat - 0.01] }
      },
      contact: { phone: '9116677880', email: 'tacofiesta@example.com' },
      cuisine_type: ['Mexican', 'Fast-Food', 'Lunch', 'Dinner'],
      rating: 4.4, numberOfReviews: 550,
      opening_hours: [{ day: 'Saturday', open: '12:00', close: '23:00' }],
      is_active: true, min_order_value: 150, delivery_radius_km: 8,
      is_veg: false, cost_for_two: 500, delivery_time_mins: 30,
      imagePath: 'https://media.istockphoto.com/id/1213818930/photo/traditional-mexican-food.jpg?s=612x612&w=0&k=20&c=oWZyaXOiPkwUF8ehSDYZvdDCcJNkdxz2qXNFeQg111A='
  },
  {
      name: 'The Vegan Vibe',
      description: 'Plant-based comfort food and delicious desserts.',
      address: {
          street: 'Sudama Nagar, near Holkar Stadium', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.035, baseLat - 0.025] }
      },
      contact: { phone: '9117788990', email: 'veganvibe@example.com' },
      cuisine_type: ['Vegan', 'Healthy', 'Desserts', 'Lunch'],
      rating: 4.8, numberOfReviews: 700,
      opening_hours: [{ day: 'Sunday', open: '11:00', close: '21:00' }],
      is_active: true, min_order_value: 180, delivery_radius_km: 7,
      is_veg: true, cost_for_two: 450, delivery_time_mins: 30,
      imagePath: 'https://media.istockphoto.com/id/1138587655/photo/healthy-energy-balls-made-of-dried-fruits-and-nuts.jpg?s=612x612&w=0&k=20&c=TmWUlmA-2wPjEwUnNWLqX75Li-z1FrJYtwH-rx0TWig='
  },
  {
      name: 'Samurai Sushi',
      description: 'Elegant and authentic Japanese sushi and rolls.',
      address: {
          street: 'Navlakha, near Medanta Hospital', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.045, baseLat - 0.045] }
      },
      contact: { phone: '9118899001', email: 'samuraisushi@example.com' },
      cuisine_type: ['Sushi', 'Asian', 'Dinner'],
      rating: 4.9, numberOfReviews: 1200,
      opening_hours: [{ day: 'Monday', open: '18:00', close: '00:00' }],
      is_active: true, min_order_value: 400, delivery_radius_km: 12,
      is_veg: false, cost_for_two: 1500, delivery_time_mins: 55,
      imagePath: 'https://media.istockphoto.com/id/1053855542/photo/chopstick-with-nigiri-sushi-piece.jpg?s=612x612&w=0&k=20&c=sy31QLUoIhuuacPrd9_Aick4D_yVEZEbVTZv_k4tuZc='
  },
  {
      name: 'The Deli Club',
      description: 'Gourmet sandwiches and fresh salads.',
      address: {
          street: 'MG Road, near 56 Dukan', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.005, baseLat + 0.005] }
      },
      contact: { phone: '9119900112', email: 'deliclub@example.com' },
      cuisine_type: ['Sandwiches', 'Salads', 'Lunch'],
      rating: 4.2, numberOfReviews: 450,
      opening_hours: [{ day: 'Tuesday', open: '10:00', close: '21:00' }],
      is_active: true, min_order_value: 120, delivery_radius_km: 6,
      is_veg: false, cost_for_two: 400, delivery_time_mins: 25,
      imagePath: 'https://media.istockphoto.com/id/619637254/photo/two-fresh-submarine-sandwiches.jpg?s=612x612&w=0&k=20&c=5WtuqMq6eYFognGqc7wkGUspHxcKNWr-rV2rkAegM7g='
  },
  {
      name: 'Pind Balluchi',
      description: 'Traditional Punjabi and North Indian food.',
      address: {
          street: 'Vijay Nagar, above Domino\'s', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.055, baseLat + 0.025] }
      },
      contact: { phone: '9120011223', email: 'pindballuchi@example.com' },
      cuisine_type: ['Indian', 'North Indian', 'Dinner'],
      rating: 4.5, numberOfReviews: 2000,
      opening_hours: [{ day: 'Wednesday', open: '12:00', close: '23:00' }],
      is_active: true, min_order_value: 250, delivery_radius_km: 7,
      is_veg: false, cost_for_two: 700, delivery_time_mins: 40,
      imagePath: 'https://media.istockphoto.com/id/1287073766/photo/indian-thali-selection-of-various-dishes-served-on-round-wooden-platter-assorted-indian.jpg?s=612x612&w=0&k=20&c=-mPog3Vw0DP5Hcgy15ZGdw-5sALPWJqML--9ctmBqqU='
  },
  {
      name: 'The Pizza Box',
      description: 'Customizable pizzas with a variety of toppings.',
      address: {
          street: 'Malhar Mall, Food Court', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.015, baseLat + 0.025] }
      },
      contact: { phone: '9121122334', email: 'pizzabox@example.com' },
      cuisine_type: ['Pizza', 'Italian', 'Fast-Food'],
      rating: 4.0, numberOfReviews: 800,
      opening_hours: [{ day: 'Thursday', open: '11:00', close: '22:00' }],
      is_active: true, min_order_value: 150, delivery_radius_km: 5,
      is_veg: true, cost_for_two: 600, delivery_time_mins: 30,
      imagePath: 'https://media.istockphoto.com/id/1360522777/photo/image-of-unrecognisable-person-selecting-pizza-slice-various-toppings-including-hawaiian.jpg?s=612x612&w=0&k=20&c=apVkuYJXY83NWBARVuCFR-Md15r2yPhMsbi8R9N72SI='
  },
  {
      name: 'Burger Factory',
      description: 'Hand-crafted burgers with fresh, local ingredients.',
      address: {
          street: 'Scheme No. 78, AB Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.025, baseLat + 0.005] }
      },
      contact: { phone: '9122233445', email: 'burgerfactory@example.com' },
      cuisine_type: ['Burgers', 'Fast-Food', 'Lunch', 'Dinner'],
      rating: 4.6, numberOfReviews: 1400,
      opening_hours: [{ day: 'Friday', open: '12:00', close: '23:00' }],
      is_active: true, min_order_value: 180, delivery_radius_km: 8,
      is_veg: false, cost_for_two: 550, delivery_time_mins: 30,
      imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ0m6SGCOjS4X6Vtuo27F2f_udUkYsHfXQtQ&s'
  },
  {
      name: 'The Chinese Wok',
      description: 'Authentic Chinese street food and dim sum.',
      address: {
          street: 'Bhawarkua, near IES College', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.01, baseLat - 0.035] }
      },
      contact: { phone: '9123344556', email: 'chinesewok@example.com' },
      cuisine_type: ['Chinese', 'Asian', 'Fast-Food'],
      rating: 4.0, numberOfReviews: 700,
      opening_hours: [{ day: 'Saturday', open: '11:00', close: '22:00' }],
      is_active: true, min_order_value: 200, delivery_radius_km: 6,
      is_veg: false, cost_for_two: 400, delivery_time_mins: 25,
      imagePath: 'https://media.istockphoto.com/id/1198150167/photo/steamed-asian-dumplings.jpg?s=612x612&w=0&k=20&c=VKToz4HA4MzcrG6wUAQn87-45O5V90VGG5c24OqA2F4='
  },
  {
      name: 'Cakes & Bakes',
      description: 'Freshly baked cakes, pastries, and desserts.',
      address: {
          street: 'Mahalaxmi Nagar', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.06, baseLat + 0.01] }
      },
      contact: { phone: '9124455667', email: 'cakesandbakes@example.com' },
      cuisine_type: ['Desserts', 'Bakery', 'Beverages'],
      rating: 4.8, numberOfReviews: 1800,
      opening_hours: [{ day: 'Sunday', open: '09:00', close: '21:00' }],
      is_active: true, min_order_value: 100, delivery_radius_km: 8,
      is_veg: true, cost_for_two: 250, delivery_time_mins: 20,
      imagePath: 'https://media.istockphoto.com/id/1499768486/photo/sales-assistant-in-bakery-putting-gluten-free-label-into-freshly-baked-brownies.jpg?s=612x612&w=0&k=20&c=Cc0-jrSbRO1uOuja-Tkvyd4VBc4H5aY0Adhe489-DN0='
  },
  {
      name: 'The Organic Kitchen',
      description: 'All-organic, farm-to-table healthy meals.',
      address: {
          street: 'Rau, Bypass Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.05, baseLat - 0.05] }
      },
      contact: { phone: '9125566778', email: 'organickitchen@example.com' },
      cuisine_type: ['Healthy', 'Vegan', 'Salads'],
      rating: 4.9, numberOfReviews: 900,
      opening_hours: [{ day: 'Monday', open: '10:00', close: '20:00' }],
      is_active: true, min_order_value: 200, delivery_radius_km: 9,
      is_veg: true, cost_for_two: 500, delivery_time_mins: 35,
      imagePath: 'https://media.istockphoto.com/id/1475072762/photo/making-a-salad.jpg?s=612x612&w=0&k=20&c=hr_vLLQXpb6BRzNFfYH0ZlLEw9_DFBg1Pr0uPTWBmQQ='
  },
  {
      name: 'Mexican Burrito House',
      description: 'Hearty burritos, nachos, and quesadillas.',
      address: {
          street: 'Vijay Nagar, Near Bombay Hospital', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.045, baseLat - 0.02] }
      },
      contact: { phone: '9126677889', email: 'burritohouse@example.com' },
      cuisine_type: ['Mexican', 'Fast-Food'],
      rating: 4.3, numberOfReviews: 600,
      opening_hours: [{ day: 'Tuesday', open: '12:00', close: '22:00' }],
      is_active: true, min_order_value: 180, delivery_radius_km: 7,
      is_veg: false, cost_for_two: 550, delivery_time_mins: 30,
      imagePath: 'https://media.istockphoto.com/id/628234210/photo/quesadilla-on-a-wooden-table.jpg?s=612x612&w=0&k=20&c=7eNzcl421I5Mso7t2LnfUjti2_nbY7XMwDnsvlnhnx4='
  },
  {
      name: 'The Sizzling Grill',
      description: 'Grilled food and BBQ platters.',
      address: {
          street: 'Kanchan Bagh, AB Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.025, baseLat + 0.025] }
      },
      contact: { phone: '9127788990', email: 'sizzlinggrill@example.com' },
      cuisine_type: ['BBQ', 'Dinner', 'Lunch'],
      rating: 4.7, numberOfReviews: 1100,
      opening_hours: [{ day: 'Wednesday', open: '12:00', close: '23:00' }],
      is_active: true, min_order_value: 250, delivery_radius_km: 9,
      is_veg: false, cost_for_two: 950, delivery_time_mins: 45,
      imagePath: 'https://media.istockphoto.com/id/2149097599/photo/assorted-grilled-meats-and-vegetables-on-barbecue-ribs-lamb-chops-beef-turkey-chicken.jpg?s=612x612&w=0&k=20&c=g_nK-7T-VrRPp5ZPhW6HcCAsqzxnCYluPRDDAQ3rNW8='
  },
  {
      name: 'Veggie World',
      description: 'All-vegetarian, traditional and modern dishes.',
      address: {
          street: 'Sapna Sangeeta, near Treasure Island', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.015, baseLat + 0.035] }
      },
      contact: { phone: '9128899001', email: 'veggieworld@example.com' },
      cuisine_type: ['Indian', 'Vegan', 'Healthy', 'Lunch', 'Dinner'],
      rating: 4.4, numberOfReviews: 1500,
      opening_hours: [{ day: 'Thursday', open: '11:00', close: '23:00' }],
      is_active: true, min_order_value: 150, delivery_radius_km: 7,
      is_veg: true, cost_for_two: 500, delivery_time_mins: 30,
      imagePath: 'https://media.istockphoto.com/id/1212329362/photo/table-top-view-of-indian-food.jpg?s=612x612&w=0&k=20&c=qLGeFzjZl10DmzgvF6mi1KAQVXHgCpBqgKaYx9DRzXw='
  },
  {
      name: 'The South Indian Rasoi',
      description: 'Crispy dosas, idlis, and authentic South Indian thalis.',
      address: {
          street: 'MG Road, near C21 Mall', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.02, baseLat + 0.02] }
      },
      contact: { phone: '9129900112', email: 'southrasoi@example.com' },
      cuisine_type: ['Indian', 'South Indian', 'Breakfast', 'Lunch'],
      rating: 4.6, numberOfReviews: 1200,
      opening_hours: [{ day: 'Friday', open: '09:00', close: '22:00' }],
      is_active: true, min_order_value: 120, delivery_radius_km: 5,
      is_veg: true, cost_for_two: 350, delivery_time_mins: 25,
      imagePath: 'https://media.istockphoto.com/id/1460788317/photo/south-indian-vegetarian-breakfast.jpg?s=612x612&w=0&k=20&c=uWbKr62yUQ4xf7_rzfEjEq1ELk-vYyO1obLTvd6E-3s='
  },
  {
      name: 'The Shake Factory',
      description: 'Thick, creamy shakes and a wide range of beverages.',
      address: {
          street: 'Vijay Nagar, Scheme 54', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.03, baseLat + 0.045] }
      },
      contact: { phone: '9130011223', email: 'shakefactory@example.com' },
      cuisine_type: ['Beverages', 'Desserts', 'Fast-Food'],
      rating: 4.5, numberOfReviews: 900,
      opening_hours: [{ day: 'Saturday', open: '11:00', close: '23:00' }],
      is_active: true, min_order_value: 100, delivery_radius_km: 6,
      is_veg: true, cost_for_two: 200, delivery_time_mins: 20,
      imagePath: 'https://media.istockphoto.com/id/512752948/photo/chocolate-milkshake-with-whipped-cream.jpg?s=612x612&w=0&k=20&c=ngIDW6yk07lR2UDSQqtPyz2vuab8AA_iJlRrJYwNhhk='
  },
  {
      name: 'The Lunch Box',
      description: 'Curated lunch meals and thalis for quick delivery.',
      address: {
          street: 'Rajendra Nagar, near DAVV', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.045, baseLat - 0.01] }
      },
      contact: { phone: '9131122334', email: 'lunchbox@example.com' },
      cuisine_type: ['Lunch', 'Indian'],
      rating: 4.1, numberOfReviews: 400,
      opening_hours: [{ day: 'Sunday', open: '11:30', close: '15:00' }],
      is_active: true, min_order_value: 150, delivery_radius_km: 5,
      is_veg: false, cost_for_two: 300, delivery_time_mins: 25,
      imagePath: 'https://media.istockphoto.com/id/1173807289/photo/indian-food.jpg?s=612x612&w=0&k=20&c=1F-in5AuRPGd8-95r0r2DZAwP7Qf6KQrROHxINFXsxM='
  },
  {
      name: 'The Dinner Bell',
      description: 'Gourmet dinner options delivered to your doorstep.',
      address: {
          street: 'L.I.G. Colony, near Geeta Bhawan', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.025, baseLat + 0.035] }
      },
      contact: { phone: '9132233445', email: 'dinnerbell@example.com' },
      cuisine_type: ['Dinner', 'Indian', 'Italian'],
      rating: 4.5, numberOfReviews: 800,
      opening_hours: [{ day: 'Monday', open: '18:00', close: '00:00' }],
      is_active: true, min_order_value: 250, delivery_radius_km: 8,
      is_veg: false, cost_for_two: 800, delivery_time_mins: 40,
      imagePath: 'https://media.istockphoto.com/id/1164157153/photo/helthy-food-delivery-of-coil-cooking-meat-fish-and-vegetables.jpg?s=612x612&w=0&k=20&c=xHGRcIMc5MsTwV82wCKJE79ZwNjX8pHErqrysvaV5tU='
  },
  {
      name: 'The Healthy Cafe',
      description: 'Wholesome and nutritious meals for a healthy life.',
      address: {
          street: 'Scheme No. 114, near Bombay Hospital', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.055, baseLat + 0.02] }
      },
      contact: { phone: '9133344556', email: 'healthycafe@example.com' },
      cuisine_type: ['Healthy', 'Breakfast', 'Lunch'],
      rating: 4.7, numberOfReviews: 600,
      opening_hours: [{ day: 'Tuesday', open: '09:00', close: '21:00' }],
      is_active: true, min_order_value: 150, delivery_radius_km: 7,
      is_veg: true, cost_for_two: 400, delivery_time_mins: 30,
      imagePath: 'https://media.istockphoto.com/id/2150471415/photo/vegan-buddha-bowl-for-balanced-diet-with-tofu-quinoa-vegetables-and-legumes-wooden-table.jpg?s=612x612&w=0&k=20&c=ZUQbh9AZLg9GvlqpbLf50gegsG6qu2hZU6TyyjbRZ7M='
  },
  {
      name: 'The Soup Spot',
      description: 'Daily fresh soups and grilled sandwiches.',
      address: {
          street: 'Ring Road, near Velocity', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.02, baseLat - 0.04] }
      },
      contact: { phone: '9134455667', email: 'soupspot@example.com' },
      cuisine_type: ['Soups', 'Sandwiches', 'Lunch'],
      rating: 4.2, numberOfReviews: 350,
      opening_hours: [{ day: 'Wednesday', open: '11:00', close: '20:00' }],
      is_active: true, min_order_value: 100, delivery_radius_km: 6,
      is_veg: true, cost_for_two: 300, delivery_time_mins: 25,
      imagePath: 'https://media.istockphoto.com/id/532704551/photo/homemade-grilled-cheese-with-tomato-soup.jpg?s=612x612&w=0&k=20&c=3LVSax_eDlLM6p8KU9r8ZrBknuaip_4lUhZttJTB_dI='
  },
  {
      name: 'The BBQ House',
      description: 'Classic BBQ ribs, chicken, and steaks.',
      address: {
          street: 'Vijay Nagar, Scheme 54', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.035, baseLat + 0.02] }
      },
      contact: { phone: '9135566778', email: 'bbqhouse@example.com' },
      cuisine_type: ['BBQ', 'Dinner'],
      rating: 4.8, numberOfReviews: 900,
      opening_hours: [{ day: 'Thursday', open: '18:00', close: '01:00' }],
      is_active: true, min_order_value: 300, delivery_radius_km: 10,
      is_veg: false, cost_for_two: 1100, delivery_time_mins: 50,
      imagePath: 'https://media.istockphoto.com/id/177486070/photo/barbecue-chicken-and-ribs.jpg?s=612x612&w=0&k=20&c=5i1Q9CZ-Uag1O56fwj6H4lgT2IWLYJg60ToA78O_yl4='
  },
  {
      name: 'The Indian Street Food',
      description: 'Authentic Indian street food and snacks.',
      address: {
          street: 'Sarafa Bazaar, Main Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.01, baseLat - 0.01] }
      },
      contact: { phone: '9136677889', email: 'indianstreetfood@example.com' },
      cuisine_type: ['Indian', 'Fast-Food'],
      rating: 4.4, numberOfReviews: 2000,
      opening_hours: [{ day: 'Friday', open: '16:00', close: '02:00' }],
      is_active: true, min_order_value: 80, delivery_radius_km: 4,
      is_veg: true, cost_for_two: 200, delivery_time_mins: 20,
      imagePath: 'https://media.istockphoto.com/id/465006874/photo/street-food-stall-in-india.jpg?s=612x612&w=0&k=20&c=M_p2sqrDzHf3HmJNnfx1hrlz-HYu46sgykoIu2hQGiY='
  },
  {
      name: 'The Italian Bistro',
      description: 'Classic Italian dishes and desserts.',
      address: {
          street: 'MG Road, near Regal Square', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.01, baseLat - 0.015] }
      },
      contact: { phone: '9137788990', email: 'italianbistro@example.com' },
      cuisine_type: ['Italian', 'Pizza', 'Pasta', 'Desserts'],
      rating: 4.6, numberOfReviews: 1200,
      opening_hours: [{ day: 'Saturday', open: '12:00', close: '23:00' }],
      is_active: true, min_order_value: 200, delivery_radius_km: 7,
      is_veg: true, cost_for_two: 700, delivery_time_mins: 35,
      imagePath: 'https://media.istockphoto.com/id/1319266483/photo/typical-italian-dessert-cannoli-from-sicily.jpg?s=612x612&w=0&k=20&c=C-hAezG3mvZfSXrEptYuBwdHdR3QAZZp6Wf1qTQ1utw='
  },
  {
      name: 'The Burger Joint',
      description: 'Juicy, gourmet burgers and crispy fries.',
      address: {
          street: 'Scheme No. 54, near Vijay Nagar', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.04, baseLat - 0.005] }
      },
      contact: { phone: '9138899001', email: 'burgerjoint@example.com' },
      cuisine_type: ['Burgers', 'Fast-Food'],
      rating: 4.3, numberOfReviews: 900,
      opening_hours: [{ day: 'Sunday', open: '11:00', close: '22:00' }],
      is_active: true, min_order_value: 150, delivery_radius_km: 6,
      is_veg: false, cost_for_two: 450, delivery_time_mins: 25,
      imagePath: 'https://media.istockphoto.com/id/617759204/photo/steakhouse-double-bacon-cheeseburger.jpg?s=612x612&w=0&k=20&c=QRaHtrxJsmNKOlOTkvxyE-o-3kM-Me1zU320yPT8ycI='
  },
  {
      name: 'The Asian Wok',
      description: 'Authentic Chinese and Thai stir-fries.',
      address: {
          street: 'Malhar Mall Road, near C21 Mall', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon + 0.02, baseLat + 0.015] }
      },
      contact: { phone: '9139900112', email: 'asianwok@example.com' },
      cuisine_type: ['Asian', 'Chinese', 'Dinner'],
      rating: 4.5, numberOfReviews: 700,
      opening_hours: [{ day: 'Monday', open: '12:00', close: '23:00' }],
      is_active: true, min_order_value: 200, delivery_radius_km: 8,
      is_veg: false, cost_for_two: 600, delivery_time_mins: 35,
      imagePath: 'https://media.istockphoto.com/id/622068426/photo/stir-fry-with-chicken-mushrooms-broccoli-and-peppers.jpg?s=612x612&w=0&k=20&c=u5nlDN-OFrrrOiDxr4EYp5b1L4oUGdEcJdyla1HunAs='
  },
  {
      name: 'The Dessert Spot',
      description: 'Delicious cakes, pastries, and ice creams.',
      address: {
          street: 'Sudama Nagar, near Holkar Stadium', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.03, baseLat - 0.035] }
      },
      contact: { phone: '9140011223', email: 'dessertspot@example.com' },
      cuisine_type: ['Desserts', 'Beverages', 'Bakery'],
      rating: 4.9, numberOfReviews: 1500,
      opening_hours: [{ day: 'Tuesday', open: '11:00', close: '23:00' }],
      is_active: true, min_order_value: 100, delivery_radius_km: 6,
      is_veg: true, cost_for_two: 250, delivery_time_mins: 20,
      imagePath: 'https://media.istockphoto.com/id/1194628992/photo/ice-cream-cake-with-chocolate-and-strawberries-on-plate-close-up-selective-focus.jpg?s=612x612&w=0&k=20&c=pFsfUhL-5TK7oq1_RCCimn7Wm-ll9zcgVaU3TxRhN5U='
  },
  {
      name: 'The Breakfast House',
      description: 'All-day breakfast with classic and modern options.',
      address: {
          street: 'Rajendra Nagar, near DAVV', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
          location: { type: 'Point', coordinates: [baseLon - 0.05, baseLat - 0.015] }
      },
      contact: { phone: '9141122334', email: 'breakfasthouse@example.com' },
      cuisine_type: ['Breakfast', 'Cafe', 'Beverages'],
      rating: 4.6, numberOfReviews: 800,
      opening_hours: [{ day: 'Wednesday', open: '08:00', close: '20:00' }],
      is_active: true, min_order_value: 120, delivery_radius_km: 7,
      is_veg: false, cost_for_two: 400, delivery_time_mins: 30,
      imagePath: 'https://media.istockphoto.com/id/504424770/photo/breakfast-on-valentines-day-fried-eggs.jpg?s=612x612&w=0&k=20&c=SQXchOVyz_fU1Cs2W3GhKY3-dm73crULlDYowf3Ot_g='
  },
];


