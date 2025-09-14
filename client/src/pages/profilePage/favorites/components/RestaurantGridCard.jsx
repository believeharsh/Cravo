import Icon from '../../../../components/ui/Icon';

const RestaurantGridCard = ({ item, handleRemoveFromFavorites }) => {
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
        <p className="text-sm text-medium-gray mb-1 line-clamp-1">
          <Icon
            name="location-pin"
            className="inline-block w-4 h-4 mr-1 text-red-500"
          />
          {item.address.street}, {item.address.city}
        </p>
        <p className="text-sm text-coffee font-medium mb-3">
          {item.cuisine_type.join(', ')}
        </p>
        <button
          onClick={() => (window.location.href = `tel:${item.contact.phone}`)}
          className="w-full flex items-center justify-center py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-white font-semibold transition-colors"
        >
          <Icon name="phone" className="w-5 h-5" /> Call Restaurant
        </button>
      </div>
    </div>
  );
};

export default RestaurantGridCard;
