import RestaurantCard from '../../../../components/shared/RestaurantCard';
import Icon from '../../../../components/ui/Icon';

const RestaurantGridCard = ({ item, list, listId }) => {
  // console.log(item, list, listId) ;
  return <RestaurantCard data={item} listId={listId} />;
};

export default RestaurantGridCard;
