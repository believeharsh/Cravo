const products = [
  // Category_Pizza
  {
    category: "Pizza",
    products: [
      { name: "Margherita Pizza", image: "https://media.istockphoto.com/id/1387856824/photo/hot-cheese-stringy-slice-lifted-of-full-baked-pizza-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=gllhgkN6ckp-V31zInzCRAhtdfpdksN_ae5tlk1sNA8=" },
      { name: "Pepperoni Pizza", image: "https://media.istockphoto.com/id/804291810/photo/pepperoni-pizza-italian-pizza-on-white-background.jpg?s=612x612&w=0&k=20&c=LZ-NCv3zCd9ZJO0MgNxoYppvWLsox890bwNm8wLMovE=" },
      { name: "BBQ Chicken Pizza", image: "" },
      { name: "Veggie Supreme Pizza", image: "https://t3.ftcdn.net/jpg/03/07/65/18/360_F_307651812_yiydVwvUeeZlTCuUs4E2aqsUMUlwIo86.jpg" },
      { name: "Four Cheese Pizza", image: "" },
      { name: "Hawaiian Pizza", image: "" },
      { name: "Paneer Tikka Pizza", image: "" },
      { name: "Mushroom & Spinach Pizza", image: "" },
      { name: "Meat Lovers Pizza", image: "" },
      { name: "Farmhouse Pizza", image: "" },
    ],
  },

  // Category_Burgers
  {
    category: "Burgers",
    products: [
      { name: "Classic Beef Burger", image: "" },
      { name: "Cheeseburger", image: "" },
      { name: "Chicken Burger", image: "" },
      { name: "Veggie Burger", image: "" },
      { name: "Paneer Burger", image: "" },
      { name: "Bacon Burger", image: "" },
      { name: "Double Patty Burger", image: "" },
      { name: "Crispy Fish Burger", image: "" },
      { name: "Mushroom Swiss Burger", image: "" },
      { name: "BBQ Pulled Pork Burger", image: "" },
    ],
  },

  // Category_Indian
  {
    category: "Indian",
    products: [
      {
        name: "Dal Tadka",
        image: "",
      },
      { name: "Paneer Butter Masala", image: "" },
      { name: "Chicken Curry", image: "" },
      { name: "Aloo Paratha", image: "" },
      { name: "Vegetable Biryani", image: "" },
      { name: "Rajma Chawal", image: "" },
      { name: "Palak Paneer", image: "" },
      { name: "Mutton Rogan Josh", image: "" },
      { name: "Chole Bhature", image: "" },
      { name: "Masoor Dal", image: "" },
      { name: "Masala Bhindi", image: "" },
      { name: "Jeera Rice", image: "" },
      { name: "Pakoda Kadhi", image: "" },
      { name: "Boondi Rayta", image: "" },
      { name: "Khichdi", image: "" },
    ],
  },

  // Category_Italian
  {
    category: "Italian",
    products: [
      { name: "Margherita Pizza", image: "" },
      { name: "Pepperoni Pizza", image: "" },
      { name: "Four Cheese Pizza", image: "" },
      { name: "Spaghetti Carbonara", image: "" },
      { name: "Penne Arrabbiata", image: "" },
      { name: "Lasagna", image: "" },
      { name: "Fettuccine Alfredo", image: "" },
      { name: "Mushroom Risotto", image: "" },
      { name: "Gnocchi with Pesto", image: "" },
      { name: "Bruschetta", image: "" },
    ],
  },

  // Desserts
  {
    category: "Desserts",
    products: [
      { name: "Chocolate Cake", image: "" },
      { name: "Cheesecake", image: "" },
      { name: "Brownie with Ice Cream", image: "" },
      { name: "Gulab Jamun", image: "" },
      { name: "Rasmalai", image: "" },
      { name: "Tiramisu", image: "" },
      { name: "Fruit Tart", image: "" },
      { name: "Mousse", image: "" },
      { name: "Ice Cream Sundae", image: "" },
      { name: "Apple Pie", image: "" },
    ],
  },

  // Beverages
  {
    category: "Beverages",
    products: [
      { name: "Masala Chai", image: "" },
      { name: "Cold Coffee", image: "" },
      { name: "Fresh Lime Soda", image: "" },
      { name: "Mango Smoothie", image: "" },
      { name: "Iced Tea", image: "" },
      { name: "Hot Chocolate", image: "" },
      { name: "Lassi", image: "" },
      { name: "Orange Juice", image: "" },
      { name: "Watermelon Juice", image: "" },
      { name: "Cappuccino", image: "" },
    ],
  },

  // Breakfast
  {
    category: "Breakfast",
    products: [
      { name: "Idli Sambar", image: "" },
      { name: "Dosa", image: "" },
      { name: "Poha", image: "" },
      { name: "Upma", image: "" },
      { name: "Paratha with Curd", image: "" },
      { name: "Pancakes", image: "" },
      { name: "Omelette", image: "" },
      { name: "Aloo Puri", image: "" },
      { name: "Vegetable Sandwich", image: "" },
      { name: "Chole Kulche", image: "" },
    ],
  },

  // Healthy
  {
    category: "Healthy",
    products: [
      { name: "Quinoa Salad", image: "" },
      { name: "Grilled Chicken Breast", image: "" },
      { name: "Sprout Salad", image: "" },
      { name: "Oats Porridge", image: "" },
      { name: "Grilled Fish with Vegetables", image: "" },
      { name: "Green Smoothie", image: "" },
      { name: "Steamed Broccoli and Carrots", image: "" },
      { name: "Greek Yogurt with Berries", image: "" },
      { name: "Hummus with Veggie Sticks", image: "" },
      { name: "Brown Rice with Stir-Fried Veggies", image: "" },
    ],
  },

  // Fast-Food
  {
    category: "Fast Food",
    products: [
      { name: "French Fries", image: "" },
      { name: "Fried Chicken", image: "" },
      { name: "Hot Dog", image: "" },
      { name: "Cheese Balls", image: "" },
      { name: "Chicken Nuggets", image: "" },
      { name: "Onion Rings", image: "" },
      { name: "Loaded Nachos", image: "" },
      { name: "Mozzarella Sticks", image: "" },
      { name: "Chicken Popcorn", image: "" },
      { name: "Veggie Wrap", image: "" },
    ],
  },

  // Mexican
  {
    category: "Mexican",
    products: [
      { name: "Tacos", image: "" },
      { name: "Burrito", image: "" },
      { name: "Quesadilla", image: "" },
      { name: "Enchiladas", image: "" },
      { name: "Nachos with Cheese", image: "" },
      { name: "Chimichanga", image: "" },
      { name: "Mexican Rice", image: "" },
      { name: "Guacamole with Chips", image: "" },
      { name: "Fajitas", image: "" },
      { name: "Churros", image: "" },
    ],
  },

  // Vegan
  {
    category: "Vegan",
    products: [
      { name: "Vegan Buddha Bowl", image: "" },
      { name: "Vegan Tofu Stir-Fry", image: "" },
      { name: "Vegan Lentil Soup", image: "" },
      { name: "Vegan Veggie Burger", image: "" },
      { name: "Vegan Pasta Primavera", image: "" },
      { name: "Vegan Chickpea Curry", image: "" },
      { name: "Vegan Quinoa Salad", image: "" },
      { name: "Vegan Smoothie Bowl", image: "" },
      { name: "Vegan Vegetable Stew", image: "" },
      { name: "Vegan Chocolate Cake", image: "" },
    ],
  },

  // Sushi
  {
    category: "Sushi",
    products: [
      { name: "California Roll", image: "" },
      { name: "Spicy Tuna Roll", image: "" },
      { name: "Salmon Nigiri", image: "" },
      { name: "Eel Avocado Roll", image: "" },
      { name: "Vegetable Roll", image: "" },
      { name: "Shrimp Tempura Roll", image: "" },
      { name: "Philadelphia Roll", image: "" },
      { name: "Rainbow Roll", image: "" },
      { name: "Dragon Roll", image: "" },
      { name: "Tuna Sashimi", image: "" },
    ],
  },

  // Sandwiches
  {
    category: "Sandwiches",
    products: [
      { name: "Club Sandwich", image: "" },
      { name: "Grilled Cheese Sandwich", image: "" },
      { name: "Veggie Delight Sandwich", image: "" },
      { name: "Chicken Mayo Sandwich", image: "" },
      { name: "BLT Sandwich", image: "" },
      { name: "Tuna Salad Sandwich", image: "" },
      { name: "Egg Salad Sandwich", image: "" },
      { name: "Turkey and Cheese Sandwich", image: "" },
      { name: "Paneer Tikka Sandwich", image: "" },
      { name: "Ham and Swiss Sandwich", image: "" },
    ],
  },

  // salads
  {
    category: "Salads",
    products: [
      { name: "Caesar Salad", image: "" },
      { name: "Greek Salad", image: "" },
      { name: "Caprese Salad", image: "" },
      { name: "Cobb Salad", image: "" },
      { name: "Garden Fresh Salad", image: "" },
      { name: "Quinoa Salad", image: "" },
      { name: "Chickpea Salad", image: "" },
      { name: "Spinach and Strawberry Salad", image: "" },
      { name: "Pasta Salad", image: "" },
      { name: "Watermelon Feta Salad", image: "" },
    ],
  },

  // soups
  {
    category: "Soup",
    products: [
      { name: "Tomato Soup", image: "" },
      { name: "Sweet Corn Soup", image: "" },
      { name: "Hot and Sour Soup", image: "" },
      { name: "Minestrone Soup", image: "" },
      { name: "Lentil Soup", image: "" },
      { name: "Chicken Noodle Soup", image: "" },
      { name: "Cream of Mushroom Soup", image: "" },
      { name: "Pumpkin Soup", image: "" },
      { name: "Broccoli Cheddar Soup", image: "" },
      { name: "Miso Soup", image: "" },
    ],
  },

  // BBQ
  {
    category: "BBQ",
    products: [
      { name: "BBQ Chicken Wings", image: "" },
      { name: "BBQ Ribs", image: "" },
      { name: "BBQ Pulled Pork", image: "" },
      { name: "BBQ Beef Brisket", image: "" },
      { name: "BBQ Grilled Vegetables", image: "" },
      { name: "BBQ Sausages", image: "" },
      { name: "BBQ Chicken Skewers", image: "" },
      { name: "BBQ Burgers", image: "" },
      { name: "BBQ Corn on the Cob", image: "" },
      { name: "BBQ Fish Fillet", image: "" },
    ],
  },

  // Category_Dinner
  {
    category: "Dinner",
    products: [
      { name: "Dal Tadka", category: "Dinner", image: "" },
      { name: "Paneer Butter Masala", category: "Dinner", image: "" },
      { name: "Chicken Curry", category: "Dinner", image: "" },
      { name: "Aloo Paratha", category: "Dinner", image: "" },
      { name: "Vegetable Biryani", category: "Dinner", image: "" },
      { name: "Rajma Chawal", category: "Dinner", image: "" },
      { name: "Palak Paneer", category: "Dinner", image: "" },
      { name: "Mutton Rogan Josh", category: "Dinner", image: "" },
      { name: "Chole Bhature", category: "Dinner", image: "" },
      { name: "Masoor Dal", category: "Dinner", image: "" },
    ],
  },

  // Category_Lunch
  {
    category: "Lunch",
    products: [
      { name: "Shahi Paneer", category: "Lunch", image: "" },
      { name: "Fish Curry", category: "Lunch", image: "" },
      { name: "Veg Pulao", category: "Lunch", image: "" },
      { name: "Baingan Bharta", category: "Lunch", image: "" },
      { name: "Kadhi Pakora", category: "Lunch", image: "" },
      { name: "Stuffed Capsicum", category: "Lunch", image: "" },
      { name: "Butter Chicken", category: "Lunch", image: "" },
      { name: "Gatte Ki Sabzi", category: "Lunch", image: "" },
      { name: "Prawn Masala", category: "Lunch", image: "" },
      { name: "Mix Veg Curry", category: "Lunch", image: "" },
    ],
  },
];
