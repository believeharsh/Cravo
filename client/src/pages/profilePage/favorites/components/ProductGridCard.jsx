import Icon from '../../../../components/ui/Icon';

const ProductGridCard = ({
  item,
  handleRemoveFromFavorites,
  handleAddToCart,
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-cream overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 bg-gray-200">
        <img
          src={item.images?.[0]}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => handleRemoveFromFavorites(item._id)}
          className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
        >
          <Icon name="heart" className="w-5 h-5 text-red-500 fill-current" />
        </button>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-charcoal line-clamp-1">
          {item.name}
        </h3>
        <p className="text-sm text-medium-gray mb-2 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-mint-green">
            ${item.price}
          </span>
          <button
            onClick={() => handleAddToCart(item)}
            className="flex items-center gap-2 py-2 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-white font-medium transition-colors"
          >
            <Icon name="shopping-cart" className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGridCard;
