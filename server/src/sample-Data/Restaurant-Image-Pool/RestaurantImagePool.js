/**
 * Centralized Image Pool for Restaurants
 *
 * This file contains a collection of image URLs categorized by cuisine type.
 * The seeding script will use this pool to randomly assign a relevant image
 * to each restaurant, allowing for smart reuse of a limited image set.
 *
 * You can expand this pool with your 100-150 images.
 */
export const RestaurantImagePool = {
  // Existing categories
  'north-indian': [
    // 1
    'https://media.istockphoto.com/id/1158623408/photo/indian-hindu-veg-thali-food-platter-selective-focus.jpg?s=612x612&w=0&k=20&c=MOm3sfIfL22URV6juSCxpA3yfr4O63yJUV5vitufR7Y=',

    // 2
    'https://media.istockphoto.com/id/1158577428/photo/indian-hindu-veg-thali-food-platter-selective-focus.jpg?s=612x612&w=0&k=20&c=Fk9UFrt3tpWr15K-Hzeb0bJ2i61zRg67K6flXwpHU0E=',

    // 3
    'https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M=',

    // 4
    'https://media.istockphoto.com/id/889609260/photo/indian-feast-with-butter-chicken-chicken-tandoori-lamb-curry-vegetable-curry-samosas-pakoras.jpg?s=612x612&w=0&k=20&c=H5e015cZrjMeimrjcNEt-mSgF0CpA2hX4nqXYwZa20U=',

    // 5
    'https://plus.unsplash.com/premium_photo-1712678280159-8475d353e3c5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bm9ydGglMjBpbmRpYW4lMjBmb29kfGVufDB8fDB8fHww',

    // 6
    'https://media.istockphoto.com/id/848643264/photo/north-indina-thali-lunch-plate-of-north-indian.jpg?s=612x612&w=0&k=20&c=J8Jg7VhqpSla7CwNai1yrlCplL1VTdr0QOB8ifG7KME=',
  ],

  indian: [
    // 1
    'https://media.istockphoto.com/id/639389404/photo/authentic-indian-food.jpg?s=612x612&w=0&k=20&c=gbfAu17L1gtHmuo5biByhfCefAtYUtGQpyxMmi9_Mus=',

    'https://media.istockphoto.com/id/1488738018/photo/medu-vada-or-medu-vada-with-sambhar-and-coconut-chutney-red-chutney-green-chutney-popular.jpg?s=612x612&w=0&k=20&c=dvWgKhQuw1lfOBxDpR6YFMLSZnWdyqYGV1pvcBt7mZw=',

    // 3
    'https://media.istockphoto.com/id/1403976698/photo/assorted-indian-various-food-with-spices-rice-and-fresh-vegetables.jpg?s=612x612&w=0&k=20&c=OvR9dax0jvmhCGm6_Hjn7LuOtX1llNV4UFUNihnmpiw=',

    // 4
    'https://media.istockphoto.com/id/641845768/photo/chicken-tikka-masala-spicy-curry-meat-food-with-rice.jpg?s=612x612&w=0&k=20&c=xuN7pIMIbqbOu4A-P0v6hzF09UFdA3Mr9Y9ZWaisU4w=',

    // 5
    'https://media.istockphoto.com/id/1024558722/photo/group-of-south-indian-food-like-masala-dosa-uttapam-idli-idly-wada-vada-sambar-appam-semolina.jpg?s=612x612&w=0&k=20&c=cbuPAUzlnqlnXhZAa2NbLoSHLUi6OEaVFayHKRAYO7E=',

    // 6
    'https://media.istockphoto.com/id/162244500/photo/table-filled-with-freshly-made-indian-food.jpg?s=612x612&w=0&k=20&c=g9-Wz-_wyltAWCaiNM-cI4QoXO_xY4IscCAdvP20Me8=',
  ],
  'south-indian': [
    'https://media.istockphoto.com/id/1441974092/photo/south-indian-dosa-with-green-chutney-and-sambhar.jpg?s=612x612&w=0&k=20&c=Rx2GZ_F6yz8QotfTWhWhX82bHvSUSQ3ZIc1P0LMhe1M=',
    'https://media.istockphoto.com/id/1460788317/photo/south-indian-vegetarian-breakfast.jpg?s=612x612&w=0&k=20&c=uWbKr62yUQ4xf7_rzfEjEq1ELk-vYyO1obLTvd6E-3s=',
  ],
  pizza: [
    'https://media.istockphoto.com/id/1171008705/photo/italian-pizza-margherita.jpg?s=612x612&w=0&k=20&c=J1i7bbbex7tk3FXs8W-hd9Yf9ZxnsE5C36O92Z3zcoM=',
    'https://media.istockphoto.com/id/1279109393/photo/freshly-baked-pizza.jpg?s=612x612&w=0&k=20&c=3VYg6qGq3_pjO3LBM9hN5phXj0rbfK3ny14hM-4JfAk=',
  ],
  burgers: [
    'https://media.istockphoto.com/id/1302436326/photo/junk-food-homemade-beef-burgers-on-vintage-wooden-background.jpg?s=612x612&w=0&k=20&c=NsyDE31unoNd80wGfrkMOqvsnjeNOpHER-yL_8KwcRw=',
    'https://media.istockphoto.com/id/1272912092/photo/delicious-burger-with-french-fries.jpg?s=612x612&w=0&k=20&c=fxAyjXlD3oGht3WjcOaK3vQpPGW-7r8x4KNYNLy0wkk=',
  ],
  chinese: [
    'https://media.istockphoto.com/id/483137365/photo/asian-chow-mein-noodles.jpg?s=612x612&w=0&k=20&c=aVkPKpDkiAM7CxTFinQBax0i-nm-ybzWimrJRyPePcg=',
    'https://media.istockphoto.com/id/1158272160/photo/hakka-noodles-is-a-popular-indo-chinese-recipes.jpg?s=612x612&w=0&k=20&c=rxx_ky0j5zkrIUxFrCAxJenCjQ7sIEtLDq9SJRtmxyQ=',
  ],
  desserts: [
    'https://media.istockphoto.com/id/952117426/photo/bakery-products.jpg?s=612x612&w=0&k=20&c=XQQ_Ue1kW28EdaFLlj3E0updE6TXuyHRWAhU4Yvk8Ds=',
    'https://media.istockphoto.com/id/497792366/photo/chocolate-cake-slice.jpg?s=612x612&w=0&k=20&c=uJXzKrA5GaUFxgsE9drZ6ZfjYGTsAx-MttBjLqKKxdk=',
  ],
  'indian-sweets': [
    'https://media.istockphoto.com/id/512836851/photo/jalebi-indian-sweet.jpg?s=170667a&w=0&k=20&c=ds9-qHq-56SOD4QKXo8UJn9_UhuxHjfAFw_aGPN-fvY=',
    'https://media.istockphoto.com/id/1450283222/photo/rasgulla.jpg?s=612x612&w=0&k=20&c=KkncK6Pp3Pj9C0j3u8bFQlHT9-wcV6Yjz1dRslBkkGw=',
  ],
  'street-food': [
    'https://media.istockphoto.com/id/1212760932/photo/vegan-sandwich-with-tofu-pepper-carrot-hummus-and-green-dressing-on-the-board.jpg?s=612x612&w=0&k=20&c=mHlhWPJ2E0fjEuPbY-MAPG63bipl0iTI1RgT_TWejEY=',
    'https://media.istockphoto.com/id/1323993532/photo/indian-chicken-kathi-roll.jpg?s=612x612&w=0&k=20&c=pX9p_3u22u2OaL72x-2yJb2b-sC3fS4a-VBAA_hLgCg=',
  ],
  bbq: [
    'https://media.istockphoto.com/id/639704480/photo/tandoori-chicken.jpg?s=612x612&w=0&k=20&c=bVqkm6WAVlR6VfOU7r5kCIGU7ixQj45ktY76t09nVxQ=',
    'https://media.istockphoto.com/id/1162114735/photo/grilled-meat.jpg?s=612x612&w=0&k=20&c=if2g4AIlEqRja28U4k0vTg2jSlb8l1K_0f41jIhvKrg=',
  ],
  healthy: [
    'https://media.istockphoto.com/id/1132006401/photo/vegetable-salad.jpg?s=612x612',
    'https://media.istockphoto.com/id/1183053361/photo/fresh-salad-bowl.jpg?s=612x612&w=0&k=20&c=fZ7K5JKj36k8XOnY1mrbiLiw3X9oyvTX6U1Vls15fN0=',
  ],
  mexican: [
    'https://media.istockphoto.com/id/1151110346/photo/mexican-tacos.jpg?s=612x612',
    'https://media.istockphoto.com/id/1316145936/photo/tacos-with-vegetables.jpg?s=612x612&w=0&k=20&c=6cDVBkz9jDFPrsHj8KNEDrRYPoa4IbC07UzGOh3Bt3E=',
  ],
  italian: [
    'https://media.istockphoto.com/id/1453469035/photo/spaghetti-pasta-with-tomato-sauce.jpg?s=612x612&w=0&k=20&c=UJrhcAcEjM8JfiToPAJGkpMu8n4ABrBrB7ozW7rjCy0=',
    'https://media.istockphoto.com/id/1352856480/photo/italian-dishes-for-family-dinner.jpg?s=612x612&w=0&k=20&c=Lh-hcYnHGOIoM9Q1nPXiVHuEVsQVpsxezLYfz_FLby0=',
  ],
  japanese: [
    'https://media.istockphoto.com/id/1204075635/photo/assorted-sushi-rolls.jpg?s=612x612&w=0&k=20&c=8ZqGg-b0qfqyVPlsg_dDqkWkwK1lJ4kFZ_f1bX5n8V4=',
    'https://media.istockphoto.com/id/508032520/photo/sushi-set-nigiri-and-sashimi-with-tea.jpg?s=612x612&w=0&k=20&c=-gNB5bYMSTumWI9D09XPcVuYEsuLxkVuJKUdp-2vGIc=',
  ],
  // New categories with placeholder URLs
  beverages: [
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Beverages-1',
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Beverages-2',
  ],
  breakfast: [
    // 1
    'https://media.istockphoto.com/id/1016644302/photo/tricolored-idli-with-sambhar-and-chutney.jpg?s=612x612&w=0&k=20&c=DfHVVWzM8Al9KDcvvOSpLGLlx-FMxBPs48bm41-RPjg=',

    // 2
    'https://media.istockphoto.com/id/516105760/photo/methi-paratha.jpg?s=612x612&w=0&k=20&c=Jm-xSkbJ2w_D8wDQZf6Dsrr9T5aPldoBnW-PiSEriAQ=',

    // 3
    'https://media.istockphoto.com/id/482365681/photo/indian-breakfast.jpg?s=612x612&w=0&k=20&c=cDOZBEd5Kmwza7UVGgSXgo6uPTHrg-Yr1pJ-3Em5Xkc=',

    // 4
    'https://media.istockphoto.com/id/1152760727/vector/closeup-of-woman-eating-south-indian-north-karnataka-peoples-daily-healhy-breakfast-jowar.jpg?s=612x612&w=0&k=20&c=Vt-mdNiBKE70J0ILKEMGSDwaqzx9IU7WnK78wBsYu5E=',

    // 5
    'https://media.istockphoto.com/id/1294992032/video/rajasthani-crispy-and-delicious-food-plate-traditional-veg-tasty-food-view.jpg?s=640x640&k=20&c=t8OqJRpYTEXZ191TTKSDV1yUmSfT7R6ik_s1Y8kKYbg=',

    // 6
    'https://media.istockphoto.com/id/1294024613/photo/indian-street-food-poha.jpg?s=612x612&w=0&k=20&c=8xlbh7FrU-pqHJlEr1R63KBHiGiUQ388FAE0T7UUOGc=',
  ],
  'fast-food': [
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Fast-Food-1',
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Fast-Food-2',
  ],
  vegan: [
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Vegan-1',
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Vegan-2',
  ],
  sushi: [
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Sushi-1',
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Sushi-2',
  ],
  sandwiches: [
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Sandwiches-1',
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Sandwiches-2',
  ],
  salads: [
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Salads-1',
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Salads-2',
  ],
  soups: [
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Soups-1',
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Soups-2',
  ],
  dinner: [
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Dinner-1',
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Dinner-2',
  ],
  lunch: [
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Lunch-1',
    'https://placehold.co/800x600/b0b0b0/ffffff?text=Lunch-2',
  ],
  // A default category for cuisines that don't have a specific image pool yet.
  default: [
    'https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=P3j3V5I8sDb2I1T2dthg5_JNFv3adD3-Kj0iTCyFTmY=',
    'https://media.istockphoto.com/id/1295274245/photo/delicious-meal-on-a-black-plate-top-view-copy-space.jpg?s=612x612&w=0&k=20&c=vr3SGEKUSWSOhV5M-2hB-n91v7K-DHy30VpQVE_wpA4=',
  ],
};
