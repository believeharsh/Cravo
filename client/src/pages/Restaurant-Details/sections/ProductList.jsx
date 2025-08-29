import React from 'react';
import Icon from '../../../components/ui/Icon';
import ProductCard from './ProductCard';
// Reusable Product Card Component (you can move this to its own file later)

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
