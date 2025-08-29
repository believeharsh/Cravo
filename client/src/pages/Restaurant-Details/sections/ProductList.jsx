import React from 'react';
import Icon from '../../../components/ui/Icon';

// Reusable Product Card Component (you can move this to its own file later)
const ProductCard = ({ item, handleAddToCart }) => (
  <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
    <div className="flex-grow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{item.description}</p>
          {item.isBestseller && (
            <div className="flex items-center text-sm font-semibold text-amber-500 mb-1">
              <Icon name="star" className="w-4 h-4 mr-1 fill-current" />{' '}
              Bestseller
            </div>
          )}
          <div className="flex items-center">
            <Icon name="indian-rupee" className="text-gray-800 w-4 h-4 mr-1" />
            <span className="text-xl font-extrabold text-gray-800">
              {item.price}
            </span>
          </div>
        </div>
        {item.images && item.images.length > 0 && (
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 ml-4 rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
    <div className="mt-4 flex justify-end">
      <button
        onClick={() => handleAddToCart(item)}
        className="flex items-center px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-full hover:bg-yellow-500 transition-colors duration-200 shadow-md"
      >
        <Icon name="shopping-cart" className="w-4 h-4 mr-2" /> Add
      </button>
    </div>
  </div>
);

const ProductList = ({ menuItems, activeFilter }) => {
  const handleAddToCart = item => {
    console.log('Adding to cart:', item.name);
  };

  const filteredMenuItems = menuItems.filter(item => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Veg') return item.isVeg;
    if (activeFilter === 'Non-Veg') return !item.isVeg;
    if (activeFilter === 'Bestseller') return item.isBestseller;
    return true;
  });

  const categorizedItems = filteredMenuItems.reduce((acc, item) => {
    const categoryName = item.category?.name || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {});

  const bestsellers = filteredMenuItems.filter(item => item.isBestseller);

  return (
    <div className="mt-8">
      {bestsellers.length > 0 && (
        <div id="bestsellers-section" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Icon
              name="star"
              className="w-6 h-6 mr-2 fill-current text-amber-500"
            />{' '}
            Bestsellers
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bestsellers.map(item => (
              <ProductCard
                key={item._id}
                item={item}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      )}

      {Object.entries(categorizedItems).length > 0 ? (
        Object.entries(categorizedItems).map(([category, items]) => (
          <div
            key={category}
            id={category.toLowerCase().replace(/\s/g, '-')}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {category}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map(item => (
                <ProductCard
                  key={item._id}
                  item={item}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 text-lg col-span-full mt-8">
          No menu items available for this selection.
        </p>
      )}
    </div>
  );
};

export default ProductList;
