import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllWishlists } from '../../features/wishList/wishListSlice';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { lists, loading, error } = useSelector(state => state.wishlist);

  console.log('prodcut list response from the product api', lists);

  useEffect(() => {
    dispatch(fetchAllWishlists());
  }, [dispatch]);

  if (loading === 'pending') {
    return <div>Loading your wishlists...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {lists.map(list => (
        <div key={list.id}>
          <h3>{list.name}</h3>
          <ul>
            {list.items.map(item => (
              <li key={item._id}>
                {item.name} ({item.type})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
