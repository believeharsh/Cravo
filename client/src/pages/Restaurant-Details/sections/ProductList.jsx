import React from 'react';
import Icon from '../../../components/ui/Icon';
import ProductCard from '../../../components/shared/ProductCard';

const ProductList = ({ menuItems, activeFilter }) => {
  const filteredMenuItems = menuItems.filter(item => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Veg') return item.isVeg;
    if (activeFilter === 'Non-Veg') return !item.isVeg;
    if (activeFilter === 'Bestseller') return item.isBestseller;
    return true;
  });

  // Handle the "Bestseller" filter as a special case
  if (activeFilter === 'Bestseller') {
    return (
      <div className="mt-8">
        {filteredMenuItems.length > 0 ? (
          <div id="bestsellers-section" className="mb-10">
            <h2 className="text-2xl font-bold text-text-main mb-4 flex items-center">
              <Icon
                name="star"
                className="w-6 h-6 mr-2 fill-current text-amber-500"
              />{' '}
              Bestsellers
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMenuItems.map(item => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-text-secondary text-lg col-span-full mt-8">
            No bestseller items available at the moment.
          </p>
        )}
      </div>
    );
  }

  // For all other filters, group by category
  const categorizedItems = filteredMenuItems.reduce((acc, item) => {
    const categoryName = item.category?.name || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {});

  return (
    <div className="mt-8">
      {Object.entries(categorizedItems).length > 0 ? (
        Object.entries(categorizedItems).map(([category, items]) => (
          <div
            key={category}
            id={category.toLowerCase().replace(/\s/g, '-')}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold text-text-main mb-4">
              {category}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map(item => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-text-secondary text-lg col-span-full mt-8">
          No menu items available for this selection.
        </p>
      )}
    </div>
  );
};

export default ProductList;
