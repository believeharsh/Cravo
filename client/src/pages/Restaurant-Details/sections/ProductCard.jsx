import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../../components/ui/Icon';
import { useCartActions } from '../../../hooks/useCartActions';

const ProductCard = ({ item }) => {
  const { handleAddToCart, handleDecreaseQuantity, handleIncreaseQuantity } =
    useCartActions();

  // finding the current item in the cart, if it exists.
  // We're assuming no customizations are selected here.
  const existingItem = useSelector(state =>
    state.cart.items.find(cartItem => cartItem.product._id === item._id)
  );

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{item.description}</p>
            {item.isBestseller && (
              <div className="flex items-center text-sm font-semibold text-amber-500 mb-1">
                <Icon name="star" className="w-4 h-4 mr-1 fill-current" />{' '}
                Bestseller
              </div>
            )}
            <div className="flex items-center">
              <Icon
                name="indian-rupee"
                className="text-gray-800 w-4 h-4 mr-1"
              />
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
        {existingItem ? (
          <div className="flex items-center space-x-3 bg-white border-1 border-yellow-200 rounded-sm p-3">
            <button
              onClick={() => handleDecreaseQuantity(item, existingItem)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-gray-800 font-semibold hover:bg-yellow-500 transition-colors duration-200 shadow-md"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                -
              </span>
            </button>
            <span className="text-lg font-bold text-gray-800">
              {existingItem.quantity}
            </span>
            <button
              onClick={() => handleIncreaseQuantity(item)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-gray-800 font-semibold hover:bg-yellow-500 transition-colors duration-200 shadow-md"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                +
              </span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(item)}
            className="flex items-center px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-full hover:bg-yellow-500 transition-colors duration-200 shadow-md"
          >
            <Icon name="shopping-cart" className="w-4 h-4 mr-2" /> Add
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
