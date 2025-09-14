import Icon from '../../../../components/ui/Icon';

const ProductListCard = ({
  item,
  handleRemoveFromFavorites,
  handleAddToCart,
}) => {
  return (
    <div className="flex items-center bg-white rounded-2xl shadow-md border border-cream p-4 hover:shadow-lg transition-all">
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 mr-4">
        <img
          src={item.images?.[0]}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-charcoal line-clamp-1">
          {item.name}
        </h3>
        <p className="text-sm text-medium-gray line-clamp-2">
          {item.description}
        </p>
        <span className="text-lg font-bold text-mint-green">{item.price}</span>
      </div>
      <div className="flex items-center gap-3 ml-4">
        <button
          onClick={() => handleAddToCart(item)}
          className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white transition-colors"
        >
          <Icon name="shopping-cart" className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleRemoveFromFavorites(item._id)}
          className="p-2 rounded-full bg-white border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
        >
          <Icon name="heart" className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
};

export default ProductListCard;
