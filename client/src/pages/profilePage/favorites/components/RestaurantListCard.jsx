import RestaurantCard from '../../../../components/shared/RestaurantCard';
import Icon from '../../../../components/ui/Icon';

const RestaurantListCard = ({ item, handleRemoveFromFavorites }) => {
  return <RestaurantCard data={item} />;
};

export default RestaurantListCard;
