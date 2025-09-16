import Icon from '../../../../components/ui/Icon';
import { useFavoriteActions } from '../../../../hooks/useWishlistActions';

const ProductListCard = ({
  item,
  list,
  // handleRemoveFromFavorites,
  handleAddToCart,
}) => {
  const { handleRemoveItemFromWishlist } = useFavoriteActions();
  console.log('list is coming inside the ProductListCart', list);

  const handleRemoveClick = () => {
    // Collect the data needed for the function
    const payload = {
      listId: list._id,
      itemId: item._id,
      itemType: list.list_type === 'productList' ? 'product' : 'restaurant',
    };

    handleRemoveItemFromWishlist(payload);
  };

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
          onClick={handleRemoveClick}
          className="p-2 rounded-full bg-white border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <Icon name="heart" className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
};

export default ProductListCard;
