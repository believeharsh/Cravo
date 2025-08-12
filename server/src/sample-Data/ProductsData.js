export const products = [
    // Products for 'Maame Da Dhaba'
    {
        name: 'Chicken Tikka Masala', description: 'Classic chicken tikka in a spiced creamy tomato sauce.',
        images: 'https://media.istockphoto.com/id/1351251041/photo/overhead-shot-of-indian-culinary-in-little-pan.jpg?s=612x612&w=0&k=20&c=qszF2xVPuhrJKgXeTw1XFhE3QLAoV6iH7PE8O_Nkro4=',
        price: 380, restaurantName: 'Maame Da Dhaba', categoryName: 'Indian',
        ingredients: ['Chicken', 'Tomato', 'Cream'], calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'MDD-CTM-001', isBestseller: true, isTrending: true, isVeg: false
    },
    {
        name: 'Dal Makhani', description: 'Black lentils cooked slowly with butter and cream.',
        images: 'https://www.shutterstock.com/image-photo/dal-makhani-daal-makhni-600nw-774184771.jpg', price: 250,
        restaurantName: 'Maame Da Dhaba', categoryName: 'Indian', ingredients: ['Lentils', 'Butter', 'Cream'],
        calorieInformation: 550, availabilityStatus: 'In Stock', sku: 'MDD-DM-002', isVeg: true
    },
    {
        name: 'Paneer Butter Masala', description: 'Cubes of cottage cheese in a rich, creamy tomato gravy.',
        images: 'https://media.istockphoto.com/id/2160229218/photo/paneer-butter-masala-in-a-bowl-on-white-background.jpg?s=612x612&w=0&k=20&c=swm0paacVCzV7Xf_cg1rEdJibxzaDSIvHXF6H1tEU8Q=',
        price: 320,
        restaurantName: 'Maame Da Dhaba', categoryName: 'Indian', ingredients: ['Paneer', 'Butter', 'Cream'],
        calorieInformation: 650, availabilityStatus: 'In Stock', sku: 'MDD-PBM-003', isVeg: true
    },
    {
        name: 'Chicken Biryani', description: 'Fragrant basmati rice with spiced chicken.',
        images: 'https://as1.ftcdn.net/jpg/05/66/68/36/1000_F_566683685_ki6zDMAsQxTelrthSbqPH2fFezqvII1l.jpg',
        price: 400,
        restaurantName: 'Maame Da Dhaba', categoryName: 'Indian', ingredients: ['Chicken', 'Basmati Rice', 'Spices'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'MDD-CB-004', isTrending: true, isVeg: false
    },
    {
        name: 'Butter Naan', description: 'Soft, buttery flatbread.',
        images: 'https://media.istockphoto.com/id/1388250623/photo/indian-tandoori-naan-bread-also-called-amritsari-tanduri-nan-kulcha-bread-cooked-in-hot-oven.jpg?s=612x612&w=0&k=20&c=ud3OA8iH8b_-W7xo5JN68udVLO4XBRsAQsf2M4wGE3k=',
         price: 50,
        restaurantName: 'Maame Da Dhaba', categoryName: 'Indian', ingredients: ['Flour', 'Butter'],
        calorieInformation: 200, availabilityStatus: 'In Stock', sku: 'MDD-BN-005', isVeg: true
    },

    // Products for 'SK Pizza Wala'
    {
        name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella and basil.',
        images: 'https://media.istockphoto.com/id/1387856824/photo/hot-cheese-stringy-slice-lifted-of-full-baked-pizza-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=gllhgkN6ckp-V31zInzCRAhtdfpdksN_ae5tlk1sNA8=' ,
        price: 450,
        restaurantName: 'SK Pizza Wala', categoryName: 'Pizza', ingredients: ['Dough', 'Mozzarella', 'Basil'],
        calorieInformation: 850, availabilityStatus: 'In Stock', sku: 'SKPW-MP-001', isVeg: true, isBestseller: true, isTrending: true
    },
    {
        name: 'Pepperoni Pizza', description: 'Classic pepperoni pizza with gooey cheese.',
        images: 'https://media.istockphoto.com/id/804291810/photo/pepperoni-pizza-italian-pizza-on-white-background.jpg?s=612x612&w=0&k=20&c=LZ-NCv3zCd9ZJO0MgNxoYppvWLsox890bwNm8wLMovE=',
        price: 500,
        restaurantName: 'SK Pizza Wala', categoryName: 'Pizza', ingredients: ['Dough', 'Pepperoni', 'Mozzarella'],
        calorieInformation: 900, availabilityStatus: 'In Stock', sku: 'SKPW-PP-002', isVeg: false
    },
    {
        name: 'Veggie Supreme Pizza', description: 'Loaded with fresh bell peppers, onions, olives, and mushrooms.',
        images: 'https://t3.ftcdn.net/jpg/03/07/65/18/360_F_307651812_yiydVwvUeeZlTCuUs4E2aqsUMUlwIo86.jpg', 
        price: 450,
        restaurantName: 'SK Pizza Wala', categoryName: 'Pizza', ingredients: ['Dough', 'Veggies', 'Mozzarella'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'SKPW-VSP-003', isVeg: true
    },
    {
        name: 'Fettuccine Alfredo', description: 'Creamy pasta with parmesan cheese.',
        images: 'https://media.istockphoto.com/id/1254382372/photo/isolated-spaghetti-with-white-cream-sauce.jpg?s=612x612&w=0&k=20&c=BQr6C62XLKPLA4DNLKc4RgcKuCtSHklC-1N4BquEzr8=', 
        price: 420,
        restaurantName: 'SK Pizza Wala', categoryName: 'Italian', ingredients: ['Fettuccine', 'Cream', 'Parmesan'],
        calorieInformation: 750, availabilityStatus: 'In Stock', sku: 'SKPW-FA-004', isVeg: true
    },
    {
        name: 'Garlic Bread Sticks', description: 'Baked bread sticks with garlic butter.',
        images: 'https://media.istockphoto.com/id/491714102/photo/garlic-bread-sticks-with-one-overly-done.jpg?s=612x612&w=0&k=20&c=6JYKGAeidU347bfZP3Zj0zRO4718TwcQIF4ulh-yc70=' ,
        price: 150,
        restaurantName: 'SK Pizza Wala', categoryName: 'Italian', ingredients: ['Bread', 'Garlic', 'Butter'],
        calorieInformation: 300, availabilityStatus: 'In Stock', sku: 'SKPW-GBS-005', isVeg: true
    },

    // Products for 'The Burger Hub'
    {
        name: 'Cheesy Classic Burger', description: 'A juicy beef patty with melted cheddar.',
        images: ['/images/burgers/cheesy_classic_burger.jpg'], price: 280,
        restaurantName: 'The Burger Hub', categoryName: 'Burgers', ingredients: ['Beef Patty', 'Cheese', 'Lettuce', 'Tomato'],
        calorieInformation: 850, availabilityStatus: 'In Stock', sku: 'TBH-CCB-001', isBestseller: true, isTrending: true, isVeg: false
    },
    {
        name: 'Crispy Chicken Burger', description: 'Crispy fried chicken fillet in a bun.',
        images: ['/images/burgers/crispy_chicken_burger.jpg'], price: 260,
        restaurantName: 'The Burger Hub', categoryName: 'Burgers', ingredients: ['Chicken Fillet', 'Bun', 'Mayo'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'TBH-CCB-002', isVeg: false
    },
    {
        name: 'Veggie Delight Burger', description: 'A hearty veggie patty with fresh salad.',
        images: ['/images/burgers/veggie_burger.jpg'], price: 240,
        restaurantName: 'The Burger Hub', categoryName: 'Burgers', ingredients: ['Veggie Patty', 'Bun', 'Lettuce', 'Tomato'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'TBH-VDB-003', isVeg: true
    },
    {
        name: 'French Fries', description: 'Crispy fried potato fries.',
        images: ['/images/burgers/french_fries.jpg'], price: 120,
        restaurantName: 'The Burger Hub', categoryName: 'Fast-Food', ingredients: ['Potatoes'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'TBH-FF-004', isVeg: true
    },

    // Products for 'Chopstix Express'
    {
        name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with mixed vegetables.',
        images: ['/images/chinese/veg_hakka_noodles.jpg'], price: 220,
        restaurantName: 'Chopstix Express', categoryName: 'Chinese', ingredients: ['Noodles', 'Veggies'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'CE-VHN-001', isVeg: true, isBestseller: true
    },
    {
        name: 'Chicken Manchurian', description: 'Fried chicken balls in a spicy Manchurian sauce.',
        images: ['/images/chinese/chicken_manchurian.jpg'], price: 300,
        restaurantName: 'Chopstix Express', categoryName: 'Chinese', ingredients: ['Chicken', 'Sauce'],
        calorieInformation: 650, availabilityStatus: 'In Stock', sku: 'CE-CM-002', isVeg: false
    },
    {
        name: 'Veg Spring Rolls', description: 'Crispy fried rolls with a vegetable filling.',
        images: ['/images/chinese/veg_spring_rolls.jpg'], price: 180,
        restaurantName: 'Chopstix Express', categoryName: 'Chinese', ingredients: ['Veggies', 'Wraps'],
        calorieInformation: 450, availabilityStatus: 'In Stock', sku: 'CE-VSR-003', isVeg: true
    },
    {
        name: 'Chilli Chicken Dry', description: 'Spicy chicken with bell peppers and onions.',
        images: ['/images/chinese/chilli_chicken.jpg'], price: 320,
        restaurantName: 'Chopstix Express', categoryName: 'Chinese', ingredients: ['Chicken', 'Peppers'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'CE-CCD-004', isVeg: false
    },

    // Products for 'Sweet Tooth Cafe'
    {
        name: 'Chocolate Brownie', description: 'A rich and gooey chocolate brownie.',
        images: ['/images/desserts/chocolate_brownie.jpg'], price: 150,
        restaurantName: 'Sweet Tooth Cafe', categoryName: 'Desserts', ingredients: ['Chocolate', 'Flour'],
        calorieInformation: 450, availabilityStatus: 'In Stock', sku: 'STC-CB-001', isBestseller: true, isTrending: true, isVeg: true
    },
    {
        name: 'Blueberry Cheesecake', description: 'Creamy cheesecake topped with blueberry compote.',
        images: ['/images/desserts/blueberry_cheesecake.jpg'], price: 250,
        restaurantName: 'Sweet Tooth Cafe', categoryName: 'Desserts', ingredients: ['Cream Cheese', 'Blueberries'],
        calorieInformation: 550, availabilityStatus: 'In Stock', sku: 'STC-BC-002', isVeg: true
    },
    {
        name: 'Hot Chocolate', description: 'Rich and creamy hot chocolate.',
        images: ['/images/beverages/hot_chocolate.jpg'], price: 120,
        restaurantName: 'Sweet Tooth Cafe', categoryName: 'Beverages', ingredients: ['Milk', 'Chocolate'],
        calorieInformation: 300, availabilityStatus: 'In Stock', sku: 'STC-HC-003', isVeg: true
    },
    {
        name: 'Espresso', description: 'A strong shot of coffee.',
        images: ['/images/beverages/espresso.jpg'], price: 80,
        restaurantName: 'Sweet Tooth Cafe', categoryName: 'Beverages', ingredients: ['Coffee Beans'],
        calorieInformation: 5, availabilityStatus: 'In Stock', sku: 'STC-E-004', isVeg: true
    },

    // Products for 'Healthy Bites'
    {
        name: 'Quinoa Salad', description: 'Fresh quinoa salad with roasted vegetables.',
        images: ['/images/healthy/quinoa_salad.jpg'], price: 280,
        restaurantName: 'Healthy Bites', categoryName: 'Healthy', ingredients: ['Quinoa', 'Veggies', 'Vinaigrette'],
        calorieInformation: 350, availabilityStatus: 'In Stock', sku: 'HB-QS-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Green Smoothie', description: 'Spinach, banana, and apple blended for energy.',
        images: ['/images/healthy/green_smoothie.jpg'], price: 150,
        restaurantName: 'Healthy Bites', categoryName: 'Healthy', ingredients: ['Spinach', 'Banana', 'Apple'],
        calorieInformation: 200, availabilityStatus: 'In Stock', sku: 'HB-GS-002', isVeg: true
    },
    {
        name: 'Protein Bowl', description: 'Grilled chicken, brown rice, and steamed broccoli.',
        images: ['/images/healthy/protein_bowl.jpg'], price: 350,
        restaurantName: 'Healthy Bites', categoryName: 'Healthy', ingredients: ['Chicken', 'Brown Rice', 'Broccoli'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'HB-PB-003', isVeg: false
    },
    {
        name: 'Lentil Soup', description: 'A warm and hearty lentil soup.',
        images: ['/images/healthy/lentil_soup.jpg'], price: 180,
        restaurantName: 'Healthy Bites', categoryName: 'Soups', ingredients: ['Lentils', 'Veggies'],
        calorieInformation: 250, availabilityStatus: 'In Stock', sku: 'HB-LS-004', isVeg: true
    },
    
    // Products for 'Grill & Chill'
    {
        name: 'Chicken Tikka Sandwich', description: 'Grilled sandwich with chicken tikka filling.',
        images: ['/images/sandwiches/chicken_tikka_sandwich.jpg'], price: 250,
        restaurantName: 'Grill & Chill', categoryName: 'Sandwiches', ingredients: ['Chicken', 'Bread', 'Mayo'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'GNC-CTS-001', isBestseller: true, isVeg: false
    },
    {
        name: 'Veggie Panini', description: 'Panini with grilled vegetables and cheese.',
        images: ['/images/sandwiches/veggie_panini.jpg'], price: 220,
        restaurantName: 'Grill & Chill', categoryName: 'Sandwiches', ingredients: ['Veggies', 'Bread', 'Cheese'],
        calorieInformation: 550, availabilityStatus: 'In Stock', sku: 'GNC-VP-002', isVeg: true
    },
    {
        name: 'Smoky BBQ Chicken Wings', description: 'Crispy chicken wings with smoky BBQ sauce.',
        images: ['/images/bbq/bbq_chicken_wings.jpg'], price: 300,
        restaurantName: 'Grill & Chill', categoryName: 'BBQ', ingredients: ['Chicken Wings', 'BBQ Sauce'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'GNC-SBCW-003', isVeg: false, isTrending: true
    },

    // Products for 'Coffee & Books'
    {
        name: 'Cappuccino', description: 'A classic espresso-based coffee with steamed milk.',
        images: ['/images/beverages/cappuccino.jpg'], price: 150,
        restaurantName: 'Coffee & Books', categoryName: 'Beverages', ingredients: ['Espresso', 'Milk Foam'],
        calorieInformation: 120, availabilityStatus: 'In Stock', sku: 'CAB-C-001', isBestseller: true, isVeg: true
    },
    {
        name: 'Americano', description: 'Hot water with a shot of espresso.',
        images: ['/images/beverages/americano.jpg'], price: 100,
        restaurantName: 'Coffee & Books', categoryName: 'Beverages', ingredients: ['Espresso', 'Water'],
        calorieInformation: 5, availabilityStatus: 'In Stock', sku: 'CAB-A-002', isVeg: true
    },
    {
        name: 'Chocolate Muffin', description: 'A soft muffin with chocolate chips.',
        images: ['/images/desserts/chocolate_muffin.jpg'], price: 80,
        restaurantName: 'Coffee & Books', categoryName: 'Desserts', ingredients: ['Flour', 'Chocolate Chips'],
        calorieInformation: 350, availabilityStatus: 'In Stock', sku: 'CAB-CM-003', isVeg: true
    },

    // Products for 'Biryani Palace'
    {
        name: 'Chicken Biryani', description: 'Fragrant basmati rice with spiced chicken.',
        images: ['/images/indian/chicken_biryani.jpg'], price: 400,
        restaurantName: 'Biryani Palace', categoryName: 'Indian', ingredients: ['Chicken', 'Basmati Rice', 'Spices'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'BP-CB-001', isBestseller: true, isVeg: false, isTrending: true
    },
    {
        name: 'Mutton Biryani', description: 'Rich mutton biryani cooked to perfection.',
        images: ['/images/indian/mutton_biryani.jpg'], price: 500,
        restaurantName: 'Biryani Palace', categoryName: 'Indian', ingredients: ['Mutton', 'Basmati Rice'],
        calorieInformation: 900, availabilityStatus: 'In Stock', sku: 'BP-MB-002', isVeg: false
    },
    {
        name: 'Veg Biryani', description: 'Vegetable biryani with aromatic spices.',
        images: ['/images/indian/veg_biryani.jpg'], price: 350,
        restaurantName: 'Biryani Palace', categoryName: 'Indian', ingredients: ['Veggies', 'Basmati Rice'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'BP-VB-003', isVeg: true
    },

    // Products for 'Dosa Hut'
    {
        name: 'Masala Dosa', description: 'Crispy dosa with a spiced potato filling.',
        images: ['/images/indian/masala_dosa.jpg'], price: 150,
        restaurantName: 'Dosa Hut', categoryName: 'South Indian', ingredients: ['Rice Batter', 'Potato'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'DH-MD-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Plain Dosa', description: 'A simple, crispy plain dosa.',
        images: ['/images/indian/plain_dosa.jpg'], price: 100,
        restaurantName: 'Dosa Hut', categoryName: 'South Indian', ingredients: ['Rice Batter'],
        calorieInformation: 300, availabilityStatus: 'In Stock', sku: 'DH-PD-002', isVeg: true
    },
    {
        name: 'Idli Sambar', description: 'Soft idlis served with sambar and chutney.',
        images: ['/images/indian/idli_sambar.jpg'], price: 120,
        restaurantName: 'Dosa Hut', categoryName: 'South Indian', ingredients: ['Rice Cakes', 'Sambar'],
        calorieInformation: 350, availabilityStatus: 'In Stock', sku: 'DH-IS-003', isVeg: true
    },

    // Products for 'El Fuego Mexican Grill'
    {
        name: 'Chicken Tacos', description: 'Three soft tacos filled with grilled chicken, salsa, and cheese.',
        images: ['/images/mexican/chicken_tacos.jpg'], price: 350,
        restaurantName: 'El Fuego Mexican Grill', categoryName: 'Mexican', ingredients: ['Tortilla', 'Chicken', 'Salsa', 'Cheese'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'EFMG-CT-001', isBestseller: true, isTrending: true, isVeg: false
    },
    {
        name: 'Veggie Burrito', description: 'A large burrito with beans, rice, veggies, and sour cream.',
        images: ['/images/mexican/veg_burrito.jpg'], price: 300,
        restaurantName: 'El Fuego Mexican Grill', categoryName: 'Mexican', ingredients: ['Tortilla', 'Beans', 'Rice', 'Veggies'],
        calorieInformation: 650, availabilityStatus: 'In Stock', sku: 'EFMG-VB-002', isVeg: true
    },
    {
        name: 'Nachos with Salsa', description: 'Crispy nachos served with a fresh tomato salsa.',
        images: ['/images/mexican/nachos_with_salsa.jpg'], price: 250,
        restaurantName: 'El Fuego Mexican Grill', categoryName: 'Mexican', ingredients: ['Nachos', 'Salsa'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'EFMG-NWS-003', isVeg: true
    },
    {
        name: 'Chicken Quesadilla', description: 'Tortilla filled with chicken and melted cheese.',
        images: ['/images/mexican/chicken_quesadilla.jpg'], price: 320,
        restaurantName: 'El Fuego Mexican Grill', categoryName: 'Mexican', ingredients: ['Tortilla', 'Chicken', 'Cheese'],
        calorieInformation: 680, availabilityStatus: 'In Stock', sku: 'EFMG-CQ-004', isVeg: false
    },

    // Products for 'Green Leaf Vegan Cafe'
    {
        name: 'Vegan Burger', description: 'A plant-based burger patty with fresh toppings.',
        images: ['/images/healthy/vegan_burger.jpg'], price: 300,
        restaurantName: 'Green Leaf Vegan Cafe', categoryName: 'Vegan', ingredients: ['Plant-based Patty', 'Bun', 'Veggies'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'GLVC-VB-001', isBestseller: true, isVeg: true
    },
    {
        name: 'Avocado Toast', description: 'Smashed avocado on sourdough toast.',
        images: ['/images/healthy/avocado_toast.jpg'], price: 250,
        restaurantName: 'Green Leaf Vegan Cafe', categoryName: 'Vegan', ingredients: ['Avocado', 'Bread'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'GLVC-AT-002', isVeg: true
    },
    {
        name: 'Lentil Soup', description: 'A warm and hearty lentil soup.',
        images: ['/images/healthy/lentil_soup.jpg'], price: 180,
        restaurantName: 'Green Leaf Vegan Cafe', categoryName: 'Soups', ingredients: ['Lentils', 'Veggies'],
        calorieInformation: 250, availabilityStatus: 'In Stock', sku: 'GLVC-LS-003', isVeg: true
    },
    {
        name: 'Vegan Chocolate Cake', description: 'A rich and decadent vegan chocolate cake.',
        images: ['/images/desserts/vegan_chocolate_cake.jpg'], price: 200,
        restaurantName: 'Green Leaf Vegan Cafe', categoryName: 'Vegan', ingredients: ['Cocoa', 'Plant-based Milk'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'GLVC-VCC-004', isVeg: true
    },

    // Products for 'The Sushi Bar'
    {
        name: 'California Roll', description: 'Classic roll with crab, avocado, and cucumber.',
        images: ['/images/sushi/california_roll.jpg'], price: 600,
        restaurantName: 'The Sushi Bar', categoryName: 'Sushi', ingredients: ['Crab', 'Avocado', 'Cucumber', 'Rice'],
        calorieInformation: 450, availabilityStatus: 'In Stock', sku: 'TSB-CR-001', isBestseller: true, isTrending: true, isVeg: false
    },
    {
        name: 'Spicy Tuna Roll', description: 'Tuna and spicy mayo.',
        images: ['/images/sushi/spicy_tuna_roll.jpg'], price: 700,
        restaurantName: 'The Sushi Bar', categoryName: 'Sushi', ingredients: ['Tuna', 'Spicy Mayo', 'Rice'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'TSB-STR-002', isVeg: false
    },
    {
        name: 'Cucumber Avocado Roll', description: 'Fresh and light vegetarian roll.',
        images: ['/images/sushi/cucumber_avocado_roll.jpg'], price: 550,
        restaurantName: 'The Sushi Bar', categoryName: 'Sushi', ingredients: ['Cucumber', 'Avocado', 'Rice'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'TSB-CAR-003', isVeg: true
    },
    {
        name: 'Salmon Nigiri', description: 'Slices of salmon over rice.',
        images: ['/images/sushi/salmon_nigiri.jpg'], price: 800,
        restaurantName: 'The Sushi Bar', categoryName: 'Sushi', ingredients: ['Salmon', 'Rice'],
        calorieInformation: 550, availabilityStatus: 'In Stock', sku: 'TSB-SN-004', isVeg: false
    },

    // Products for 'Mama\'s BBQ Joint'
    {
        name: 'Smoky BBQ Ribs', description: 'Slow-cooked pork ribs with a smoky BBQ glaze.',
        images: ['/images/bbq/bbq_ribs.jpg'], price: 800,
        restaurantName: 'Mama\'s BBQ Joint', categoryName: 'BBQ', ingredients: ['Pork Ribs', 'BBQ Sauce'],
        calorieInformation: 1200, availabilityStatus: 'In Stock', sku: 'MMBJ-SBR-001', isBestseller: true, isTrending: true, isVeg: false
    },
    {
        name: 'Grilled Chicken Platter', description: 'Grilled chicken served with roasted vegetables.',
        images: ['/images/bbq/grilled_chicken_platter.jpg'], price: 650,
        restaurantName: 'Mama\'s BBQ Joint', categoryName: 'BBQ', ingredients: ['Chicken', 'Veggies'],
        calorieInformation: 900, availabilityStatus: 'In Stock', sku: 'MMBJ-GCP-002', isVeg: false
    },
    {
        name: 'BBQ Paneer Skewers', description: 'Grilled paneer skewers with a spicy BBQ rub.',
        images: ['/images/bbq/bbq_paneer.jpg'], price: 550,
        restaurantName: 'Mama\'s BBQ Joint', categoryName: 'BBQ', ingredients: ['Paneer', 'BBQ Rub'],
        calorieInformation: 850, availabilityStatus: 'In Stock', sku: 'MMBJ-BPS-003', isVeg: true
    },

    // Products for 'The Panini Place'
    {
        name: 'Classic Panini', description: 'Grilled sandwich with pesto, mozzarella, and tomatoes.',
        images: ['/images/sandwiches/classic_panini.jpg'], price: 250,
        restaurantName: 'The Panini Place', categoryName: 'Sandwiches', ingredients: ['Bread', 'Pesto', 'Mozzarella', 'Tomatoes'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'TPP-CP-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Grilled Cheese Sandwich', description: 'Classic grilled cheese on sourdough bread.',
        images: ['/images/sandwiches/grilled_cheese_sandwich.jpg'], price: 200,
        restaurantName: 'The Panini Place', categoryName: 'Sandwiches', ingredients: ['Sourdough', 'Cheddar'],
        calorieInformation: 550, availabilityStatus: 'In Stock', sku: 'TPP-GCS-002', isVeg: true
    },
    {
        name: 'Chicken and Cheese Panini', description: 'Grilled panini with chicken and melted cheese.',
        images: ['/images/sandwiches/chicken_cheese_panini.jpg'], price: 300,
        restaurantName: 'The Panini Place', categoryName: 'Sandwiches', ingredients: ['Chicken', 'Cheese'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'TPP-CCP-003', isVeg: false
    },

    // Products for 'The Wok Master'
    {
        name: 'Veg Wok Bowl', description: 'Stir-fried vegetables and noodles in a wok.',
        images: ['/images/chinese/veg_wok_bowl.jpg'], price: 300,
        restaurantName: 'The Wok Master', categoryName: 'Chinese', ingredients: ['Veggies', 'Noodles'],
        calorieInformation: 550, availabilityStatus: 'In Stock', sku: 'TWM-VWB-001', isBestseller: true, isVeg: true
    },
    {
        name: 'Chicken Wok Bowl', description: 'Stir-fried chicken and noodles in a wok.',
        images: ['/images/chinese/chicken_wok_bowl.jpg'], price: 350,
        restaurantName: 'The Wok Master', categoryName: 'Chinese', ingredients: ['Chicken', 'Noodles'],
        calorieInformation: 650, availabilityStatus: 'In Stock', sku: 'TWM-CWB-002', isVeg: false
    },
    {
        name: 'Prawn Wok Bowl', description: 'Stir-fried prawns and rice in a wok.',
        images: ['/images/chinese/prawn_wok_bowl.jpg'], price: 400,
        restaurantName: 'The Wok Master', categoryName: 'Chinese', ingredients: ['Prawns', 'Rice'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'TWM-PWB-003', isVeg: false
    },

    // Products for 'The Cheesy Corner'
    {
        name: 'Mac & Cheese', description: 'Classic macaroni and cheese with a creamy sauce.',
        images: ['/images/italian/mac_and_cheese.jpg'], price: 350,
        restaurantName: 'The Cheesy Corner', categoryName: 'Italian', ingredients: ['Macaroni', 'Cheese Sauce'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'TCC-MAC-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Garlic Bread', description: 'Toasted bread with garlic butter.',
        images: ['/images/italian/garlic_bread.jpg'], price: 100,
        restaurantName: 'The Cheesy Corner', categoryName: 'Italian', ingredients: ['Bread', 'Garlic'],
        calorieInformation: 300, availabilityStatus: 'In Stock', sku: 'TCC-GB-002', isVeg: true
    },
    {
        name: 'Spaghetti Bolognese', description: 'Spaghetti with a rich meat sauce.',
        images: ['/images/italian/spaghetti_bolognese.jpg'], price: 450,
        restaurantName: 'The Cheesy Corner', categoryName: 'Italian', ingredients: ['Spaghetti', 'Meat Sauce'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'TCC-SB-003', isVeg: false
    },

    // Products for 'Bombay Kulfi & Falooda'
    {
        name: 'Mango Kulfi', description: 'Traditional Indian mango kulfi.',
        images: ['/images/desserts/mango_kulfi.jpg'], price: 80,
        restaurantName: 'Bombay Kulfi & Falooda', categoryName: 'Desserts', ingredients: ['Mango', 'Milk'],
        calorieInformation: 250, availabilityStatus: 'In Stock', sku: 'BKF-MK-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Pistachio Kulfi', description: 'Creamy pistachio kulfi.',
        images: ['/images/desserts/pistachio_kulfi.jpg'], price: 90,
        restaurantName: 'Bombay Kulfi & Falooda', categoryName: 'Desserts', ingredients: ['Pistachio', 'Milk'],
        calorieInformation: 300, availabilityStatus: 'In Stock', sku: 'BKF-PK-002', isVeg: true
    },
    {
        name: 'Falooda', description: 'Rose syrup, noodles, and ice cream.',
        images: ['/images/desserts/falooda.jpg'], price: 120,
        restaurantName: 'Bombay Kulfi & Falooda', categoryName: 'Desserts', ingredients: ['Rose Syrup', 'Noodles', 'Ice Cream'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'BKF-F-003', isVeg: true
    },

    // Products for 'The Brew & Grind'
    {
        name: 'Cappuccino', description: 'A classic espresso-based coffee with steamed milk.',
        images: ['/images/beverages/cappuccino.jpg'], price: 150,
        restaurantName: 'The Brew & Grind', categoryName: 'Beverages', ingredients: ['Espresso', 'Milk Foam'],
        calorieInformation: 120, availabilityStatus: 'In Stock', sku: 'TBG-C-001', isBestseller: true, isVeg: true
    },
    {
        name: 'Latte', description: 'Espresso with steamed milk and a light layer of foam.',
        images: ['/images/beverages/latte.jpg'], price: 170,
        restaurantName: 'The Brew & Grind', categoryName: 'Beverages', ingredients: ['Espresso', 'Milk'],
        calorieInformation: 150, availabilityStatus: 'In Stock', sku: 'TBG-L-002', isVeg: true
    },
    {
        name: 'Chocolate Chip Cookie', description: 'A freshly baked chocolate chip cookie.',
        images: ['/images/desserts/chocolate_chip_cookie.jpg'], price: 60,
        restaurantName: 'The Brew & Grind', categoryName: 'Desserts', ingredients: ['Flour', 'Chocolate Chips'],
        calorieInformation: 250, availabilityStatus: 'In Stock', sku: 'TBG-CCC-003', isVeg: true
    },

    // Products for 'Sagar Ratna'
    {
        name: 'Masala Dosa', description: 'Crispy dosa with a spiced potato filling.',
        images: ['/images/indian/masala_dosa.jpg'], price: 160,
        restaurantName: 'Sagar Ratna', categoryName: 'South Indian', ingredients: ['Rice Batter', 'Potato'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'SR-MD-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Idli Sambar', description: 'Soft idlis served with sambar and chutney.',
        images: ['/images/indian/idli_sambar.jpg'], price: 130,
        restaurantName: 'Sagar Ratna', categoryName: 'South Indian', ingredients: ['Rice Cakes', 'Sambar'],
        calorieInformation: 350, availabilityStatus: 'In Stock', sku: 'SR-IS-002', isVeg: true
    },
    {
        name: 'Veg Thali', description: 'A full platter of various vegetarian dishes.',
        images: ['/images/indian/veg_thali.jpg'], price: 250,
        restaurantName: 'Sagar Ratna', categoryName: 'Indian', ingredients: ['Veggies', 'Rice', 'Roti'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'SR-VT-003', isVeg: true
    },

    // Products for 'Burger Singh'
    {
        name: 'Jatt Putt Chicken Burger', description: 'Spicy chicken patty with Indian flavors.',
        images: ['/images/burgers/jatt_putt_burger.jpg'], price: 280,
        restaurantName: 'Burger Singh', categoryName: 'Burgers', ingredients: ['Chicken Patty', 'Spices'],
        calorieInformation: 750, availabilityStatus: 'In Stock', sku: 'BS-JPB-001', isBestseller: true, isVeg: false, isTrending: true
    },
    {
        name: 'United States of Punjab Burger', description: 'A classic burger with a spicy twist.',
        images: ['/images/burgers/united_states_of_punjab_burger.jpg'], price: 260,
        restaurantName: 'Burger Singh', categoryName: 'Burgers', ingredients: ['Chicken Patty', 'Lettuce', 'Mayo'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'BS-USPB-002', isVeg: false
    },
    {
        name: 'Veg Pind-e-licious Burger', description: 'A veg patty with a special pind sauce.',
        images: ['/images/burgers/veg_pind_burger.jpg'], price: 240,
        restaurantName: 'Burger Singh', categoryName: 'Burgers', ingredients: ['Veg Patty', 'Pind Sauce'],
        calorieInformation: 650, availabilityStatus: 'In Stock', sku: 'BS-VPB-003', isVeg: true
    },

    // Products for 'The Salad Factory'
    {
        name: 'Quinoa Salad', description: 'Fresh quinoa salad with roasted vegetables.',
        images: ['/images/healthy/quinoa_salad.jpg'], price: 280,
        restaurantName: 'The Salad Factory', categoryName: 'Salads', ingredients: ['Quinoa', 'Veggies', 'Vinaigrette'],
        calorieInformation: 350, availabilityStatus: 'In Stock', sku: 'TSF-QS-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Greek Salad', description: 'Fresh salad with feta cheese, olives, and bell peppers.',
        images: ['/images/healthy/greek_salad.jpg'], price: 300,
        restaurantName: 'The Salad Factory', categoryName: 'Salads', ingredients: ['Feta Cheese', 'Olives', 'Veggies'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'TSF-GS-002', isVeg: true
    },
    {
        name: 'Chicken Caesar Salad', description: 'Grilled chicken over romaine lettuce with Caesar dressing.',
        images: ['/images/healthy/chicken_caesar_salad.jpg'], price: 350,
        restaurantName: 'The Salad Factory', categoryName: 'Salads', ingredients: ['Chicken', 'Lettuce', 'Dressing'],
        calorieInformation: 450, availabilityStatus: 'In Stock', sku: 'TSF-CCS-003', isVeg: false
    },

    // Products for 'The Pasta Bowl Co.'
    {
        name: 'Spaghetti Aglio e Olio', description: 'Spaghetti with garlic, olive oil, and chili flakes.',
        images: ['/images/italian/spaghetti_aglio_e_olio.jpg'], price: 400,
        restaurantName: 'The Pasta Bowl Co.', categoryName: 'Italian', ingredients: ['Spaghetti', 'Garlic', 'Olive Oil'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'TPBC-SAO-001', isBestseller: true, isVeg: true
    },
    {
        name: 'Penne Arrabbiata', description: 'Penne pasta in a spicy tomato sauce.',
        images: ['/images/italian/penne_arrabbiata.jpg'], price: 420,
        restaurantName: 'The Pasta Bowl Co.', categoryName: 'Italian', ingredients: ['Penne', 'Tomato Sauce'],
        calorieInformation: 650, availabilityStatus: 'In Stock', sku: 'TPBC-PA-002', isVeg: true
    },
    {
        name: 'Lasagna', description: 'Layers of pasta, meat sauce, and cheese.',
        images: ['/images/italian/lasagna.jpg'], price: 550,
        restaurantName: 'The Pasta Bowl Co.', categoryName: 'Italian', ingredients: ['Lasagna', 'Meat Sauce', 'Cheese'],
        calorieInformation: 900, availabilityStatus: 'In Stock', sku: 'TPBC-L-003', isVeg: false
    },

    // Products for 'Bake House'
    {
        name: 'Chocolate Truffle Cake', description: 'A rich and dense chocolate truffle cake.',
        images: ['/images/desserts/chocolate_truffle_cake.jpg'], price: 600,
        restaurantName: 'Bake House', categoryName: 'Bakery', ingredients: ['Chocolate', 'Flour'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'BH-CTC-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Croissant', description: 'A flaky, buttery croissant.',
        images: ['/images/bakery/croissant.jpg'], price: 80,
        restaurantName: 'Bake House', categoryName: 'Bakery', ingredients: ['Flour', 'Butter'],
        calorieInformation: 300, availabilityStatus: 'In Stock', sku: 'BH-C-002', isVeg: true
    },
    {
        name: 'Red Velvet Pastry', description: 'Soft red velvet pastry with cream cheese frosting.',
        images: ['/images/desserts/red_velvet_pastry.jpg'], price: 150,
        restaurantName: 'Bake House', categoryName: 'Desserts', ingredients: ['Red Velvet', 'Cream Cheese'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'BH-RVP-003', isVeg: true
    },
    
    // Products for 'The Grand Wok'
    {
        name: 'Chicken Dim Sum', description: 'Steamed dumplings with a savory chicken filling.',
        images: ['/images/chinese/chicken_dim_sum.jpg'], price: 350,
        restaurantName: 'The Grand Wok', categoryName: 'Chinese', ingredients: ['Chicken', 'Dough'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'TGW-CDS-001', isBestseller: true, isVeg: false, isTrending: true
    },
    {
        name: 'Kung Pao Chicken', description: 'Stir-fried chicken with peanuts and vegetables.',
        images: ['/images/chinese/kung_pao_chicken.jpg'], price: 450,
        restaurantName: 'The Grand Wok', categoryName: 'Chinese', ingredients: ['Chicken', 'Peanuts'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'TGW-KPC-002', isVeg: false
    },
    {
        name: 'Veg Fried Rice', description: 'Stir-fried rice with mixed vegetables.',
        images: ['/images/chinese/veg_fried_rice.jpg'], price: 300,
        restaurantName: 'The Grand Wok', categoryName: 'Chinese', ingredients: ['Rice', 'Veggies'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'TGW-VFR-003', isVeg: true
    },

    // Products for 'Healthy Hub'
    {
        name: 'Chicken Protein Bowl', description: 'Grilled chicken, quinoa, and fresh veggies.',
        images: ['/images/healthy/chicken_protein_bowl.jpg'], price: 380,
        restaurantName: 'Healthy Hub', categoryName: 'Healthy', ingredients: ['Chicken', 'Quinoa', 'Veggies'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'HH-CPB-001', isBestseller: true, isVeg: false, isTrending: true
    },
    {
        name: 'Tofu Buddha Bowl', description: 'Tofu, brown rice, and steamed broccoli with a special sauce.',
        images: ['/images/healthy/tofu_buddha_bowl.jpg'], price: 350,
        restaurantName: 'Healthy Hub', categoryName: 'Healthy', ingredients: ['Tofu', 'Brown Rice', 'Broccoli'],
        calorieInformation: 450, availabilityStatus: 'In Stock', sku: 'HH-TBB-002', isVeg: true
    },
    {
        name: 'Lentil Soup', description: 'A warm and hearty lentil soup.',
        images: ['/images/healthy/lentil_soup.jpg'], price: 180,
        restaurantName: 'Healthy Hub', categoryName: 'Soups', ingredients: ['Lentils', 'Veggies'],
        calorieInformation: 250, availabilityStatus: 'In Stock', sku: 'HH-LS-003', isVeg: true
    },

    // Products for 'The Soup Kitchen'
    {
        name: 'Tomato Basil Soup', description: 'Classic tomato soup with fresh basil.',
        images: ['/images/soups/tomato_basil_soup.jpg'], price: 150,
        restaurantName: 'The Soup Kitchen', categoryName: 'Soups', ingredients: ['Tomato', 'Basil'],
        calorieInformation: 180, availabilityStatus: 'In Stock', sku: 'TSK-TBS-001', isBestseller: true, isVeg: true
    },
    {
        name: 'Cream of Mushroom Soup', description: 'Rich and creamy mushroom soup.',
        images: ['/images/soups/cream_of_mushroom_soup.jpg'], price: 180,
        restaurantName: 'The Soup Kitchen', categoryName: 'Soups', ingredients: ['Mushrooms', 'Cream'],
        calorieInformation: 250, availabilityStatus: 'In Stock', sku: 'TSK-CMS-002', isVeg: true
    },
    {
        name: 'Chicken Noodle Soup', description: 'Hearty chicken and noodle soup.',
        images: ['/images/soups/chicken_noodle_soup.jpg'], price: 200,
        restaurantName: 'The Soup Kitchen', categoryName: 'Soups', ingredients: ['Chicken', 'Noodles'],
        calorieInformation: 300, availabilityStatus: 'In Stock', sku: 'TSK-CNS-003', isVeg: false
    },
    
    // Products for 'The BBQ Shack'
    {
        name: 'Smoky BBQ Ribs', description: 'Slow-cooked pork ribs with a smoky BBQ glaze.',
        images: ['/images/bbq/bbq_ribs.jpg'], price: 800,
        restaurantName: 'The BBQ Shack', categoryName: 'BBQ', ingredients: ['Pork Ribs', 'BBQ Sauce'],
        calorieInformation: 1200, availabilityStatus: 'In Stock', sku: 'TBS-SBR-001', isBestseller: true, isTrending: true, isVeg: false
    },
    {
        name: 'Grilled Chicken Platter', description: 'Grilled chicken served with roasted vegetables.',
        images: ['/images/bbq/grilled_chicken_platter.jpg'], price: 650,
        restaurantName: 'The BBQ Shack', categoryName: 'BBQ', ingredients: ['Chicken', 'Veggies'],
        calorieInformation: 900, availabilityStatus: 'In Stock', sku: 'TBS-GCP-002', isVeg: false
    },
    {
        name: 'BBQ Chicken Pizza', description: 'Pizza with BBQ chicken and red onions.',
        images: ['/images/bbq/bbq_chicken_pizza.jpg'], price: 550,
        restaurantName: 'The BBQ Shack', categoryName: 'BBQ', ingredients: ['Dough', 'Chicken', 'BBQ Sauce'],
        calorieInformation: 950, availabilityStatus: 'In Stock', sku: 'TBS-BCP-003', isVeg: false
    },

    // Products for 'Taco Fiesta'
    {
        name: 'Chicken Tacos', description: 'Three soft tacos filled with grilled chicken, salsa, and cheese.',
        images: ['/images/mexican/chicken_tacos.jpg'], price: 350,
        restaurantName: 'Taco Fiesta', categoryName: 'Mexican', ingredients: ['Tortilla', 'Chicken', 'Salsa', 'Cheese'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'TF-CT-001', isBestseller: true, isTrending: true, isVeg: false
    },
    {
        name: 'Veggie Burrito', description: 'A large burrito with beans, rice, veggies, and sour cream.',
        images: ['/images/mexican/veg_burrito.jpg'], price: 300,
        restaurantName: 'Taco Fiesta', categoryName: 'Mexican', ingredients: ['Tortilla', 'Beans', 'Rice', 'Veggies'],
        calorieInformation: 650, availabilityStatus: 'In Stock', sku: 'TF-VB-002', isVeg: true
    },
    {
        name: 'Nachos with Salsa', description: 'Crispy nachos served with a fresh tomato salsa.',
        images: ['/images/mexican/nachos_with_salsa.jpg'], price: 250,
        restaurantName: 'Taco Fiesta', categoryName: 'Mexican', ingredients: ['Nachos', 'Salsa'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'TF-NWS-003', isVeg: true
    },

    // Products for 'The Vegan Vibe'
    {
        name: 'Vegan Burger', description: 'A plant-based burger patty with fresh toppings.',
        images: ['/images/healthy/vegan_burger.jpg'], price: 300,
        restaurantName: 'The Vegan Vibe', categoryName: 'Vegan', ingredients: ['Plant-based Patty', 'Bun', 'Veggies'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'TVV-VB-001', isBestseller: true, isVeg: true
    },
    {
        name: 'Avocado Toast', description: 'Smashed avocado on sourdough toast.',
        images: ['/images/healthy/avocado_toast.jpg'], price: 250,
        restaurantName: 'The Vegan Vibe', categoryName: 'Vegan', ingredients: ['Avocado', 'Bread'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'TVV-AT-002', isVeg: true
    },
    {
        name: 'Vegan Chocolate Cake', description: 'A rich and decadent vegan chocolate cake.',
        images: ['/images/desserts/vegan_chocolate_cake.jpg'], price: 200,
        restaurantName: 'The Vegan Vibe', categoryName: 'Vegan', ingredients: ['Cocoa', 'Plant-based Milk'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'TVV-VCC-003', isVeg: true
    },

    // Products for 'Samurai Sushi'
    {
        name: 'California Roll', description: 'Classic roll with crab, avocado, and cucumber.',
        images: ['/images/sushi/california_roll.jpg'], price: 600,
        restaurantName: 'Samurai Sushi', categoryName: 'Sushi', ingredients: ['Crab', 'Avocado', 'Cucumber', 'Rice'],
        calorieInformation: 450, availabilityStatus: 'In Stock', sku: 'SS-CR-001', isBestseller: true, isTrending: true, isVeg: false
    },
    {
        name: 'Spicy Tuna Roll', description: 'Tuna and spicy mayo.',
        images: ['/images/sushi/spicy_tuna_roll.jpg'], price: 700,
        restaurantName: 'Samurai Sushi', categoryName: 'Sushi', ingredients: ['Tuna', 'Spicy Mayo', 'Rice'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'SS-STR-002', isVeg: false
    },
    {
        name: 'Cucumber Avocado Roll', description: 'Fresh and light vegetarian roll.',
        images: ['/images/sushi/cucumber_avocado_roll.jpg'], price: 550,
        restaurantName: 'Samurai Sushi', categoryName: 'Sushi', ingredients: ['Cucumber', 'Avocado', 'Rice'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'SS-CAR-003', isVeg: true
    },

    // Products for 'The Deli Club'
    {
        name: 'Classic Club Sandwich', description: 'A triple-decker sandwich with chicken, bacon, and veggies.',
        images: ['/images/sandwiches/classic_club_sandwich.jpg'], price: 300,
        restaurantName: 'The Deli Club', categoryName: 'Sandwiches', ingredients: ['Bread', 'Chicken', 'Bacon'],
        calorieInformation: 750, availabilityStatus: 'In Stock', sku: 'TDC-CCS-001', isBestseller: true, isVeg: false
    },
    {
        name: 'Veggie Sub', description: 'A long sub sandwich filled with fresh vegetables and sauces.',
        images: ['/images/sandwiches/veggie_sub.jpg'], price: 250,
        restaurantName: 'The Deli Club', categoryName: 'Sandwiches', ingredients: ['Bread', 'Veggies'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'TDC-VS-002', isVeg: true
    },
    {
        name: 'Caesar Salad', description: 'Romaine lettuce with parmesan, croutons, and Caesar dressing.',
        images: ['/images/healthy/caesar_salad.jpg'], price: 280,
        restaurantName: 'The Deli Club', categoryName: 'Salads', ingredients: ['Lettuce', 'Dressing'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'TDC-CS-003', isVeg: true
    },

    // Products for 'Pind Balluchi'
    {
        name: 'Butter Chicken', description: 'Tender chicken cooked in a creamy tomato sauce.',
        images: ['/images/indian/butter_chicken.jpg'], price: 450,
        restaurantName: 'Pind Balluchi', categoryName: 'North Indian', ingredients: ['Chicken', 'Cream', 'Tomato'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'PB-BC-001', isBestseller: true, isVeg: false, isTrending: true
    },
    {
        name: 'Dal Makhani', description: 'Black lentils cooked slowly with butter and cream.',
        images: ['/images/indian/dal_makhani.jpg'], price: 280,
        restaurantName: 'Pind Balluchi', categoryName: 'North Indian', ingredients: ['Lentils', 'Butter', 'Cream'],
        calorieInformation: 550, availabilityStatus: 'In Stock', sku: 'PB-DM-002', isVeg: true
    },
    {
        name: 'Chicken Biryani', description: 'Fragrant basmati rice with spiced chicken.',
        images: ['/images/indian/chicken_biryani.jpg'], price: 420,
        restaurantName: 'Pind Balluchi', categoryName: 'North Indian', ingredients: ['Chicken', 'Basmati Rice', 'Spices'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'PB-CB-003', isVeg: false
    },

    // Products for 'The Pizza Box'
    {
        name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella and basil.',
        images: ['/images/italian/margherita_pizza.jpg'], price: 420,
        restaurantName: 'The Pizza Box', categoryName: 'Pizza', ingredients: ['Dough', 'Mozzarella', 'Basil'],
        calorieInformation: 850, availabilityStatus: 'In Stock', sku: 'TPB-MP-001', isVeg: true, isBestseller: true, isTrending: true
    },
    {
        name: 'Veggie Supreme Pizza', description: 'Loaded with fresh bell peppers, onions, olives, and mushrooms.',
        images: ['/images/italian/veggie_supreme_pizza.jpg'], price: 480,
        restaurantName: 'The Pizza Box', categoryName: 'Pizza', ingredients: ['Dough', 'Veggies', 'Mozzarella'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'TPB-VSP-002', isVeg: true
    },
    {
        name: 'Tandoori Paneer Pizza', description: 'Pizza with tandoori paneer and onions.',
        images: ['/images/pizza/tandoori_paneer_pizza.jpg'], price: 500,
        restaurantName: 'The Pizza Box', categoryName: 'Pizza', ingredients: ['Dough', 'Paneer', 'Tandoori Sauce'],
        calorieInformation: 900, availabilityStatus: 'In Stock', sku: 'TPB-TPP-003', isVeg: true
    },

    // Products for 'Burger Factory'
    {
        name: 'The Factory Burger', description: 'A juicy beef patty with a special sauce.',
        images: ['/images/burgers/the_factory_burger.jpg'], price: 300,
        restaurantName: 'Burger Factory', categoryName: 'Burgers', ingredients: ['Beef Patty', 'Sauce', 'Veggies'],
        calorieInformation: 850, availabilityStatus: 'In Stock', sku: 'BF-TFB-001', isBestseller: true, isVeg: false, isTrending: true
    },
    {
        name: 'Crispy Chicken Burger', description: 'Crispy fried chicken fillet in a bun.',
        images: ['/images/burgers/crispy_chicken_burger.jpg'], price: 280,
        restaurantName: 'Burger Factory', categoryName: 'Burgers', ingredients: ['Chicken Fillet', 'Bun', 'Mayo'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'BF-CCB-002', isVeg: false
    },
    {
        name: 'Veggie Delight Burger', description: 'A hearty veggie patty with fresh salad.',
        images: ['/images/burgers/veggie_burger.jpg'], price: 260,
        restaurantName: 'Burger Factory', categoryName: 'Burgers', ingredients: ['Veggie Patty', 'Bun', 'Lettuce', 'Tomato'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'BF-VDB-003', isVeg: true
    },

    // Products for 'The Chinese Wok'
    {
        name: 'Chilli Chicken Dry', description: 'Spicy chicken with bell peppers and onions.',
        images: ['/images/chinese/chilli_chicken.jpg'], price: 320,
        restaurantName: 'The Chinese Wok', categoryName: 'Chinese', ingredients: ['Chicken', 'Peppers'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'TCW-CCD-001', isBestseller: true, isVeg: false
    },
    {
        name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with mixed vegetables.',
        images: ['/images/chinese/veg_hakka_noodles.jpg'], price: 240,
        restaurantName: 'The Chinese Wok', categoryName: 'Chinese', ingredients: ['Noodles', 'Veggies'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'TCW-VHN-002', isVeg: true
    },
    {
        name: 'Chicken Manchurian', description: 'Fried chicken balls in a spicy Manchurian sauce.',
        images: ['/images/chinese/chicken_manchurian.jpg'], price: 300,
        restaurantName: 'The Chinese Wok', categoryName: 'Chinese', ingredients: ['Chicken', 'Sauce'],
        calorieInformation: 650, availabilityStatus: 'In Stock', sku: 'TCW-CM-003', isVeg: false
    },

    // Products for 'Cakes & Bakes'
    {
        name: 'Chocolate Truffle Cake', description: 'A rich and dense chocolate truffle cake.',
        images: ['/images/desserts/chocolate_truffle_cake.jpg'], price: 650,
        restaurantName: 'Cakes & Bakes', categoryName: 'Desserts', ingredients: ['Chocolate', 'Flour'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'CB-CTC-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Red Velvet Pastry', description: 'Soft red velvet pastry with cream cheese frosting.',
        images: ['/images/desserts/red_velvet_pastry.jpg'], price: 160,
        restaurantName: 'Cakes & Bakes', categoryName: 'Desserts', ingredients: ['Red Velvet', 'Cream Cheese'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'CB-RVP-002', isVeg: true
    },
    {
        name: 'Espresso', description: 'A strong shot of coffee.',
        images: ['/images/beverages/espresso.jpg'], price: 80,
        restaurantName: 'Cakes & Bakes', categoryName: 'Beverages', ingredients: ['Coffee Beans'],
        calorieInformation: 5, availabilityStatus: 'In Stock', sku: 'CB-E-003', isVeg: true
    },

    // Products for 'The Organic Kitchen'
    {
        name: 'Quinoa Salad', description: 'Fresh quinoa salad with roasted vegetables.',
        images: ['/images/healthy/quinoa_salad.jpg'], price: 300,
        restaurantName: 'The Organic Kitchen', categoryName: 'Healthy', ingredients: ['Quinoa', 'Veggies', 'Vinaigrette'],
        calorieInformation: 350, availabilityStatus: 'In Stock', sku: 'TOK-QS-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Vegan Buddha Bowl', description: 'A bowl with organic tofu, lentils, and veggies.',
        images: ['/images/healthy/vegan_buddha_bowl.jpg'], price: 380,
        restaurantName: 'The Organic Kitchen', categoryName: 'Vegan', ingredients: ['Tofu', 'Lentils', 'Veggies'],
        calorieInformation: 450, availabilityStatus: 'In Stock', sku: 'TOK-VBB-002', isVeg: true
    },
    {
        name: 'Tomato Soup', description: 'A simple and fresh tomato soup.',
        images: ['/images/soups/tomato_soup.jpg'], price: 150,
        restaurantName: 'The Organic Kitchen', categoryName: 'Soups', ingredients: ['Tomato'],
        calorieInformation: 150, availabilityStatus: 'In Stock', sku: 'TOK-TS-003', isVeg: true
    },

    // Products for 'Mexican Burrito House'
    {
        name: 'Chicken Burrito', description: 'A large burrito with grilled chicken and toppings.',
        images: ['/images/mexican/chicken_burrito.jpg'], price: 350,
        restaurantName: 'Mexican Burrito House', categoryName: 'Mexican', ingredients: ['Tortilla', 'Chicken', 'Rice'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'MBH-CB-001', isBestseller: true, isVeg: false
    },
    {
        name: 'Veggie Quesadilla', description: 'Tortilla filled with veggies and melted cheese.',
        images: ['/images/mexican/veggie_quesadilla.jpg'], price: 300,
        restaurantName: 'Mexican Burrito House', categoryName: 'Mexican', ingredients: ['Tortilla', 'Veggies', 'Cheese'],
        calorieInformation: 650, availabilityStatus: 'In Stock', sku: 'MBH-VQ-002', isVeg: true
    },
    {
        name: 'Nachos with Salsa', description: 'Crispy nachos served with a fresh tomato salsa.',
        images: ['/images/mexican/nachos_with_salsa.jpg'], price: 250,
        restaurantName: 'Mexican Burrito House', categoryName: 'Mexican', ingredients: ['Nachos', 'Salsa'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'MBH-NWS-003', isVeg: true
    },
    
    // Products for 'The Sizzling Grill'
    {
        name: 'BBQ Chicken Platter', description: 'Grilled chicken with BBQ sauce and sides.',
        images: ['/images/bbq/bbq_chicken_platter.jpg'], price: 700,
        restaurantName: 'The Sizzling Grill', categoryName: 'BBQ', ingredients: ['Chicken', 'BBQ Sauce'],
        calorieInformation: 1000, availabilityStatus: 'In Stock', sku: 'TSG-BCP-001', isBestseller: true, isVeg: false, isTrending: true
    },
    {
        name: 'Veg Sizzler', description: 'Sizzling platter of grilled veggies and paneer.',
        images: ['/images/bbq/veg_sizzler.jpg'], price: 600,
        restaurantName: 'The Sizzling Grill', categoryName: 'BBQ', ingredients: ['Veggies', 'Paneer'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'TSG-VS-002', isVeg: true
    },

    // Products for 'Veggie World'
    {
        name: 'Paneer Tikka', description: 'Grilled cottage cheese cubes.',
        images: ['/images/indian/paneer_tikka.jpg'], price: 320,
        restaurantName: 'Veggie World', categoryName: 'Indian', ingredients: ['Paneer', 'Spices'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'VW-PT-001', isBestseller: true, isVeg: true
    },
    {
        name: 'Veg Biryani', description: 'Vegetable biryani with aromatic spices.',
        images: ['/images/indian/veg_biryani.jpg'], price: 350,
        restaurantName: 'Veggie World', categoryName: 'Indian', ingredients: ['Veggies', 'Basmati Rice'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'VW-VB-002', isVeg: true
    },
    {
        name: 'Vegan Thali', description: 'A full platter of various vegan dishes.',
        images: ['/images/indian/vegan_thali.jpg'], price: 250,
        restaurantName: 'Veggie World', categoryName: 'Vegan', ingredients: ['Veggies', 'Rice', 'Roti'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'VW-VT-003', isVeg: true
    },
    
    // Products for 'The South Indian Rasoi'
    {
        name: 'Masala Dosa', description: 'Crispy dosa with a spiced potato filling.',
        images: ['/images/indian/masala_dosa.jpg'], price: 150,
        restaurantName: 'The South Indian Rasoi', categoryName: 'South Indian', ingredients: ['Rice Batter', 'Potato'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'TSIR-MD-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Idli Sambar', description: 'Soft idlis served with sambar and chutney.',
        images: ['/images/indian/idli_sambar.jpg'], price: 120,
        restaurantName: 'The South Indian Rasoi', categoryName: 'South Indian', ingredients: ['Rice Cakes', 'Sambar'],
        calorieInformation: 350, availabilityStatus: 'In Stock', sku: 'TSIR-IS-002', isVeg: true
    },
    {
        name: 'Uttapam', description: 'Thick pancake with toppings like onions and tomatoes.',
        images: ['/images/indian/uttapam.jpg'], price: 180,
        restaurantName: 'The South Indian Rasoi', categoryName: 'South Indian', ingredients: ['Rice Batter', 'Veggies'],
        calorieInformation: 450, availabilityStatus: 'In Stock', sku: 'TSIR-U-003', isVeg: true
    },

    // Products for 'The Shake Factory'
    {
        name: 'Oreo Shake', description: 'Thick shake with Oreo cookies.',
        images: ['/images/beverages/oreo_shake.jpg'], price: 180,
        restaurantName: 'The Shake Factory', categoryName: 'Beverages', ingredients: ['Milk', 'Oreo Cookies'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'TSF-OS-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Chocolate Shake', description: 'A classic chocolate shake.',
        images: ['/images/beverages/chocolate_shake.jpg'], price: 150,
        restaurantName: 'The Shake Factory', categoryName: 'Beverages', ingredients: ['Milk', 'Chocolate'],
        calorieInformation: 450, availabilityStatus: 'In Stock', sku: 'TSF-CS-002', isVeg: true
    },
    {
        name: 'Mango Shake', description: 'Shake with fresh mango pulp.',
        images: ['/images/beverages/mango_shake.jpg'], price: 160,
        restaurantName: 'The Shake Factory', categoryName: 'Beverages', ingredients: ['Milk', 'Mango Pulp'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'TSF-MS-003', isVeg: true
    },

    // Products for 'The Lunch Box'
    {
        name: 'Veg Thali', description: 'A full platter of various vegetarian dishes.',
        images: ['/images/indian/veg_thali.jpg'], price: 250,
        restaurantName: 'The Lunch Box', categoryName: 'Lunch', ingredients: ['Veggies', 'Rice', 'Roti'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'TLB-VT-001', isBestseller: true, isVeg: true
    },
    {
        name: 'Chicken Curry Combo', description: 'Chicken curry with rice and a side salad.',
        images: ['/images/indian/chicken_curry_combo.jpg'], price: 300,
        restaurantName: 'The Lunch Box', categoryName: 'Lunch', ingredients: ['Chicken', 'Rice'],
        calorieInformation: 900, availabilityStatus: 'In Stock', sku: 'TLB-CCC-002', isVeg: false
    },
    {
        name: 'Paneer Curry Combo', description: 'Paneer curry with rice and a side salad.',
        images: ['/images/indian/paneer_curry_combo.jpg'], price: 280,
        restaurantName: 'The Lunch Box', categoryName: 'Lunch', ingredients: ['Paneer', 'Rice'],
        calorieInformation: 850, availabilityStatus: 'In Stock', sku: 'TLB-PCC-003', isVeg: true
    },

    // Products for 'The Dinner Bell'
    {
        name: 'Chicken Tikka Masala', description: 'Classic chicken tikka in a spiced creamy tomato sauce.',
        images: ['/images/indian/chicken_tikka_masala.jpg'], price: 400,
        restaurantName: 'The Dinner Bell', categoryName: 'Indian', ingredients: ['Chicken', 'Tomato', 'Cream'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'TDB-CTM-001', isBestseller: true, isTrending: true, isVeg: false
    },
    {
        name: 'Lasagna', description: 'Layers of pasta, meat sauce, and cheese.',
        images: ['/images/italian/lasagna.jpg'], price: 550,
        restaurantName: 'The Dinner Bell', categoryName: 'Italian', ingredients: ['Lasagna', 'Meat Sauce', 'Cheese'],
        calorieInformation: 900, availabilityStatus: 'In Stock', sku: 'TDB-L-002', isVeg: false
    },
    {
        name: 'Paneer Butter Masala', description: 'Cubes of cottage cheese in a rich, creamy tomato gravy.',
        images: ['/images/indian/paneer_butter_masala.jpg'], price: 350,
        restaurantName: 'The Dinner Bell', categoryName: 'Indian', ingredients: ['Paneer', 'Butter', 'Cream'],
        calorieInformation: 650, availabilityStatus: 'In Stock', sku: 'TDB-PBM-003', isVeg: true
    },

    // Products for 'The Healthy Cafe'
    {
        name: 'Quinoa Salad', description: 'Fresh quinoa salad with roasted vegetables.',
        images: ['/images/healthy/quinoa_salad.jpg'], price: 280,
        restaurantName: 'The Healthy Cafe', categoryName: 'Healthy', ingredients: ['Quinoa', 'Veggies', 'Vinaigrette'],
        calorieInformation: 350, availabilityStatus: 'In Stock', sku: 'THC-QS-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Green Smoothie', description: 'Spinach, banana, and apple blended for energy.',
        images: ['/images/healthy/green_smoothie.jpg'], price: 150,
        restaurantName: 'The Healthy Cafe', categoryName: 'Healthy', ingredients: ['Spinach', 'Banana', 'Apple'],
        calorieInformation: 200, availabilityStatus: 'In Stock', sku: 'THC-GS-002', isVeg: true
    },
    {
        name: 'Oats & Berries', description: 'Warm oatmeal with mixed berries.',
        images: ['/images/breakfast/oats_and_berries.jpg'], price: 200,
        restaurantName: 'The Healthy Cafe', categoryName: 'Breakfast', ingredients: ['Oats', 'Berries'],
        calorieInformation: 300, availabilityStatus: 'In Stock', sku: 'THC-OAB-003', isVeg: true
    },

    // Products for 'The Soup Spot'
    {
        name: 'Tomato Basil Soup', description: 'Classic tomato soup with fresh basil.',
        images: ['/images/soups/tomato_basil_soup.jpg'], price: 150,
        restaurantName: 'The Soup Spot', categoryName: 'Soups', ingredients: ['Tomato', 'Basil'],
        calorieInformation: 180, availabilityStatus: 'In Stock', sku: 'TSS-TBS-001', isBestseller: true, isVeg: true
    },
    {
        name: 'Cream of Mushroom Soup', description: 'Rich and creamy mushroom soup.',
        images: ['/images/soups/cream_of_mushroom_soup.jpg'], price: 180,
        restaurantName: 'The Soup Spot', categoryName: 'Soups', ingredients: ['Mushrooms', 'Cream'],
        calorieInformation: 250, availabilityStatus: 'In Stock', sku: 'TSS-CMS-002', isVeg: true
    },
    {
        name: 'Veggie Sandwich', description: 'A sandwich with fresh vegetables and cheese.',
        images: ['/images/sandwiches/veggie_sandwich.jpg'], price: 180,
        restaurantName: 'The Soup Spot', categoryName: 'Sandwiches', ingredients: ['Veggies', 'Bread', 'Cheese'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'TSS-VS-003', isVeg: true
    },

    // Products for 'The BBQ House'
    {
        name: 'Smoky BBQ Ribs', description: 'Slow-cooked pork ribs with a smoky BBQ glaze.',
        images: ['/images/bbq/bbq_ribs.jpg'], price: 800,
        restaurantName: 'The BBQ House', categoryName: 'BBQ', ingredients: ['Pork Ribs', 'BBQ Sauce'],
        calorieInformation: 1200, availabilityStatus: 'In Stock', sku: 'TBH-SBR-001', isBestseller: true, isTrending: true, isVeg: false
    },
    {
        name: 'Grilled Chicken Platter', description: 'Grilled chicken served with roasted vegetables.',
        images: ['/images/bbq/grilled_chicken_platter.jpg'], price: 650,
        restaurantName: 'The BBQ House', categoryName: 'BBQ', ingredients: ['Chicken', 'Veggies'],
        calorieInformation: 900, availabilityStatus: 'In Stock', sku: 'TBH-GCP-002', isVeg: false
    },
    {
        name: 'BBQ Paneer Skewers', description: 'Grilled paneer skewers with a spicy BBQ rub.',
        images: ['/images/bbq/bbq_paneer.jpg'], price: 550,
        restaurantName: 'The BBQ House', categoryName: 'BBQ', ingredients: ['Paneer', 'BBQ Rub'],
        calorieInformation: 850, availabilityStatus: 'In Stock', sku: 'TBH-BPS-003', isVeg: true
    },

    // Products for 'The Indian Street Food'
    {
        name: 'Pani Puri', description: 'Crispy puris filled with spicy water and potatoes.',
        images: ['/images/indian/pani_puri.jpg'], price: 80,
        restaurantName: 'The Indian Street Food', categoryName: 'Indian', ingredients: ['Puri', 'Potato', 'Spicy Water'],
        calorieInformation: 300, availabilityStatus: 'In Stock', sku: 'TISF-PP-001', isBestseller: true, isVeg: true
    },
    {
        name: 'Vada Pav', description: 'Spicy potato fritter in a pav.',
        images: ['/images/indian/vada_pav.jpg'], price: 50,
        restaurantName: 'The Indian Street Food', categoryName: 'Indian', ingredients: ['Potato', 'Bread'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'TISF-VP-002', isVeg: true
    },
    {
        name: 'Samosa', description: 'Fried pastry with a savory potato filling.',
        images: ['/images/indian/samosa.jpg'], price: 40,
        restaurantName: 'The Indian Street Food', categoryName: 'Indian', ingredients: ['Flour', 'Potato'],
        calorieInformation: 350, availabilityStatus: 'In Stock', sku: 'TISF-S-003', isVeg: true
    },

    // Products for 'The Italian Bistro'
    {
        name: 'Lasagna', description: 'Layers of pasta, meat sauce, and cheese.',
        images: ['/images/italian/lasagna.jpg'], price: 550,
        restaurantName: 'The Italian Bistro', categoryName: 'Italian', ingredients: ['Lasagna', 'Meat Sauce', 'Cheese'],
        calorieInformation: 900, availabilityStatus: 'In Stock', sku: 'TIB-L-001', isBestseller: true, isVeg: false
    },
    {
        name: 'Spaghetti Bolognese', description: 'Spaghetti with a rich meat sauce.',
        images: ['/images/italian/spaghetti_bolognese.jpg'], price: 450,
        restaurantName: 'The Italian Bistro', categoryName: 'Italian', ingredients: ['Spaghetti', 'Meat Sauce'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'TIB-SB-002', isVeg: false
    },
    {
        name: 'Tiramisu', description: 'A classic coffee-flavored Italian dessert.',
        images: ['/images/desserts/tiramisu.jpg'], price: 300,
        restaurantName: 'The Italian Bistro', categoryName: 'Desserts', ingredients: ['Mascarpone', 'Coffee'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'TIB-T-003', isVeg: true
    },

    // Products for 'The Burger Joint'
    {
        name: 'The Mega Burger', description: 'A large burger with two beef patties and all the toppings.',
        images: ['/images/burgers/the_mega_burger.jpg'], price: 350,
        restaurantName: 'The Burger Joint', categoryName: 'Burgers', ingredients: ['Beef Patties', 'Veggies'],
        calorieInformation: 1000, availabilityStatus: 'In Stock', sku: 'TBJ-TMB-001', isBestseller: true, isVeg: false
    },
    {
        name: 'Veggie Classic Burger', description: 'A hearty veggie patty with fresh salad.',
        images: ['/images/burgers/veggie_burger.jpg'], price: 250,
        restaurantName: 'The Burger Joint', categoryName: 'Burgers', ingredients: ['Veggie Patty', 'Bun', 'Lettuce', 'Tomato'],
        calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'TBJ-VCB-002', isVeg: true
    },
    {
        name: 'Chicken Burger', description: 'A classic chicken burger with mayo and lettuce.',
        images: ['/images/burgers/classic_chicken_burger.jpg'], price: 280,
        restaurantName: 'The Burger Joint', categoryName: 'Burgers', ingredients: ['Chicken Patty', 'Mayo', 'Lettuce'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'TBJ-CB-003', isVeg: false
    },

    // Products for 'The Asian Wok'
    {
        name: 'Chicken Wok Bowl', description: 'Stir-fried chicken and noodles in a wok.',
        images: ['/images/chinese/chicken_wok_bowl.jpg'], price: 380,
        restaurantName: 'The Asian Wok', categoryName: 'Asian', ingredients: ['Chicken', 'Noodles'],
        calorieInformation: 650, availabilityStatus: 'In Stock', sku: 'TAW-CWB-001', isBestseller: true, isVeg: false, isTrending: true
    },
    {
        name: 'Veg Wok Bowl', description: 'Stir-fried vegetables and noodles in a wok.',
        images: ['/images/chinese/veg_wok_bowl.jpg'], price: 320,
        restaurantName: 'The Asian Wok', categoryName: 'Asian', ingredients: ['Veggies', 'Noodles'],
        calorieInformation: 550, availabilityStatus: 'In Stock', sku: 'TAW-VWB-002', isVeg: true
    },
    {
        name: 'Prawns in Schezwan Sauce', description: 'Prawns cooked in a spicy Schezwan sauce.',
        images: ['/images/chinese/prawns_schezwan_sauce.jpg'], price: 450,
        restaurantName: 'The Asian Wok', categoryName: 'Chinese', ingredients: ['Prawns', 'Schezwan Sauce'],
        calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'TAW-PSS-003', isVeg: false
    },

    // Products for 'The Dessert Spot'
    {
        name: 'Chocolate Brownie', description: 'A rich and gooey chocolate brownie.',
        images: ['/images/desserts/chocolate_brownie.jpg'], price: 150,
        restaurantName: 'The Dessert Spot', categoryName: 'Desserts', ingredients: ['Chocolate', 'Flour'],
        calorieInformation: 450, availabilityStatus: 'In Stock', sku: 'TDS-CB-001', isBestseller: true, isVeg: true, isTrending: true
    },
    {
        name: 'Blueberry Cheesecake', description: 'Creamy cheesecake topped with blueberry compote.',
        images: ['/images/desserts/blueberry_cheesecake.jpg'], price: 250,
        restaurantName: 'The Dessert Spot', categoryName: 'Desserts', ingredients: ['Cream Cheese', 'Blueberries'],
        calorieInformation: 550, availabilityStatus: 'In Stock', sku: 'TDS-BC-002', isVeg: true
    },
    {
        name: 'Hot Coffee', description: 'A classic hot coffee.',
        images: ['/images/beverages/hot_coffee.jpg'], price: 120,
        restaurantName: 'The Dessert Spot', categoryName: 'Beverages', ingredients: ['Coffee Beans'],
        calorieInformation: 100, availabilityStatus: 'In Stock', sku: 'TDS-HC-003', isVeg: true
    },

    // Products for 'The Breakfast House'
    {
        name: 'Pancakes with Maple Syrup', description: 'Fluffy pancakes with maple syrup and butter.',
        images: ['/images/breakfast/pancakes_maple_syrup.jpg'], price: 250,
        restaurantName: 'The Breakfast House', categoryName: 'Breakfast', ingredients: ['Pancake Mix', 'Syrup'],
        calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'TBH-PMS-001', isBestseller: true, isVeg: true
    },
    {
        name: 'English Breakfast', description: 'Eggs, bacon, sausages, and toast.',
        images: ['/images/breakfast/english_breakfast.jpg'], price: 350,
        restaurantName: 'The Breakfast House', categoryName: 'Breakfast', ingredients: ['Eggs', 'Bacon', 'Sausages'],
        calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'TBH-EB-002', isVeg: false
    },
    {
        name: 'Masala Omelette', description: 'Spicy Indian omelette with a side of toast.',
        images: ['/images/breakfast/masala_omelette.jpg'], price: 180,
        restaurantName: 'The Breakfast House', categoryName: 'Breakfast', ingredients: ['Eggs', 'Onions', 'Spices'],
        calorieInformation: 400, availabilityStatus: 'In Stock', sku: 'TBH-MO-003', isVeg: false
    },
];

