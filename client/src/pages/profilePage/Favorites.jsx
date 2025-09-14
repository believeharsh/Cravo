// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Icon from '../../components/ui/Icon';
// import { fetchAllWishlists } from '../../features/wishList/wishListSlice';

// // components of this page imports
// import RestaurantGridCard from './favorites/components/RestaurantGridCard';
// import ProductGridCard from './favorites/components/ProductGridCard';
// import RestaurantListCard from './favorites/components/RestaurantListCard';
// import ProductListCard from './favorites/components/ProductListCard';

// const Favorites = () => {
//   const [viewMode, setViewMode] = useState('grid');
//   const [selectedListId, setSelectedListId] = useState(null);
//   const { lists, loading } = useSelector(state => state.wishlist);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (lists.length === 0 && loading === 'idle') {
//       dispatch(fetchAllWishlists());
//     }
//   }, [dispatch, lists.length, loading]);

//   const selectedList = lists.find(list => list._id === selectedListId);

//   const handleRemoveFromFavorites = itemId => console.log(`Removing item with ID: ${itemId}`);
//   const handleAddToCart = item => console.log(`Adding ${item.name} to cart`);

//   // Renders the list of available wishlists for the user to select
//   const WishlistSelectionView = () => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {lists.map(list => (
//         <div
//           key={list._id}
//           onClick={() => setSelectedListId(list._id)}
//           className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//         >
//           <div className="flex items-center gap-4 mb-2">
//             <span className="w-12 h-12 flex-shrink-0 rounded-full bg-mint-green/20 flex items-center justify-center">
//               <Icon name={list.list_type === 'productList' ? 'shopping-bag' : 'restaurant'} className="w-6 h-6 text-mint-green" />
//             </span>
//             <div className="min-w-0">
//               <h3 className="text-xl font-bold text-charcoal line-clamp-1">{list.name}</h3>
//               <p className="text-sm text-medium-gray mt-1 capitalize">{list.list_type.replace('List', '')} Wishlist</p>
//             </div>
//           </div>
//           <p className="text-sm text-coffee mt-3 font-medium">{list.items?.length || 0} items</p>
//         </div>
//       ))}
//     </div>
//   );

//   // Renders the items of the selected list
//   const renderItemsView = () => {
//     if (!selectedList) {
//       return <div>Please select a list.</div>;
//     }

//     const items = selectedList.items;

//     if (!items || items.length === 0) {
//       return <div className="text-center text-gray-500 font-medium p-8">This list is currently empty.</div>;
//     }

//     let CardComponent;
//     if (viewMode === 'grid') {
//       CardComponent = selectedList.list_type === 'productList' ? ProductGridCard : RestaurantGridCard;
//     } else {
//       CardComponent = selectedList.list_type === 'productList' ? ProductListCard : RestaurantListCard;
//     }

//     const listContainerClass = viewMode === 'grid'
//       ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
//       : 'space-y-4';

//     return (
//       <div className={listContainerClass}>
//         {items.map(item => (
//           <CardComponent
//             key={item._id}
//             item={item}
//             handleRemoveFromFavorites={handleRemoveFromFavorites}
//             handleAddToCart={handleAddToCart}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-cream min-h-screen py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
//         <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 rounded-full bg-mint-green/20 flex items-center justify-center">
//               <Icon name="heart" className="w-8 h-8 text-mint-green" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
//                 {selectedList ? `Items in "${selectedList.name}"` : 'My Favorites'}
//               </h1>
//               <p className="text-sm text-medium-gray mt-1">Organize and manage your favorite items and restaurants.</p>
//             </div>
//           </div>
//           {selectedListId && (
//             <button
//               onClick={() => setSelectedListId(null)}
//               className="flex items-center gap-2 text-charcoal hover:text-yellow-400 transition-colors font-medium"
//             >
//               <Icon name="arrow-left" className="w-5 h-5" /> Back to lists
//             </button>
//           )}
//         </header>

//         {selectedListId ? (
//           <>
//             <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg border border-cream p-4">
//               <p className="text-sm text-medium-gray">
//                 Showing {selectedList.items?.length || 0} {selectedList.list_type === 'productList' ? 'products' : 'restaurants'}
//               </p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-mint-green text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}
//                 >
//                   <Icon name="grid" className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-mint-green text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}
//                 >
//                   <Icon name="list-view" className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//             {renderItemsView()}
//           </>
//         ) : (
//           <WishlistSelectionView />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Favorites;

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Icon from '../../components/ui/Icon';
// import { fetchAllWishlists } from '../../features/wishList/wishListSlice';

// // components of this page imports
// import RestaurantGridCard from './favorites/components/RestaurantGridCard';
// import ProductGridCard from './favorites/components/ProductGridCard';
// import RestaurantListCard from './favorites/components/RestaurantListCard';
// import ProductListCard from './favorites/components/ProductListCard';

// const Favorites = () => {
//   const [viewMode, setViewMode] = useState('grid');
//   const [selectedListId, setSelectedListId] = useState(null);
//   const { lists, loading } = useSelector(state => state.wishlist);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (lists.length === 0 && loading === 'idle') {
//       dispatch(fetchAllWishlists());
//     }
//   }, [dispatch, lists.length, loading]);

//   const selectedList = lists.find(list => list._id === selectedListId);

//   const handleRemoveFromFavorites = itemId => console.log(`Removing item with ID: ${itemId}`);
//   const handleAddToCart = item => console.log(`Adding ${item.name} to cart`);

//   // Renders the list of available wishlists for the user to select
//   const WishlistSelectionView = () => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {lists.map(list => (
//         <div
//           key={list._id}
//           onClick={() => setSelectedListId(list._id)}
//           className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//         >
//           <div className="flex items-center gap-4 mb-2">
//             <span className="w-12 h-12 flex-shrink-0 rounded-full bg-mint-green/20 flex items-center justify-center">
//               <Icon name={list.list_type === 'productList' ? 'shopping-bag' : 'restaurant'} className="w-6 h-6 text-mint-green" />
//             </span>
//             <div className="min-w-0">
//               <h3 className="text-xl font-bold text-charcoal line-clamp-1">{list.name}</h3>
//               <p className="text-sm text-medium-gray mt-1 capitalize">{list.list_type.replace('List', '')} Wishlist</p>
//             </div>
//           </div>
//           <p className="text-sm text-coffee mt-3 font-medium">{list.items?.length || 0} items</p>
//         </div>
//       ))}
//     </div>
//   );

//   // Renders the items of the selected list
//   const renderItemsView = () => {
//     if (!selectedList) {
//       return <div>Please select a list.</div>;
//     }

//     const items = selectedList.items;

//     if (!items || items.length === 0) {
//       return <div className="text-center text-gray-500 font-medium p-8">This list is currently empty.</div>;
//     }

//     let CardComponent;
//     if (viewMode === 'grid') {
//       CardComponent = selectedList.list_type === 'productList' ? ProductGridCard : RestaurantGridCard;
//     } else {
//       CardComponent = selectedList.list_type === 'productList' ? ProductListCard : RestaurantListCard;
//     }

//     const listContainerClass = viewMode === 'grid'
//       ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
//       : 'space-y-4';

//     return (
//       <div className={listContainerClass}>
//         {items.map(item => (
//           <CardComponent
//             key={item._id}
//             item={item}
//             handleRemoveFromFavorites={handleRemoveFromFavorites}
//             handleAddToCart={handleAddToCart}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-cream min-h-screen py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
//         <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 rounded-full bg-mint-green/20 flex items-center justify-center">
//               <Icon name="heart" className="w-8 h-8 text-mint-green" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
//                 {selectedList ? `Items in "${selectedList.name}"` : 'My Favorites'}
//               </h1>
//               <p className="text-sm text-medium-gray mt-1">Organize and manage your favorite items and restaurants.</p>
//             </div>
//           </div>
//           {selectedListId && (
//             <button
//               onClick={() => setSelectedListId(null)}
//               className="flex items-center gap-2 text-charcoal hover:text-yellow-400 transition-colors font-medium"
//             >
//               <Icon name="arrow-left" className="w-5 h-5" /> Back to lists
//             </button>
//           )}
//         </header>

//         {selectedListId ? (
//           <>
//             <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg border border-cream p-4">
//               <p className="text-sm text-medium-gray">
//                 Showing {selectedList.items?.length || 0} {selectedList.list_type === 'productList' ? 'products' : 'restaurants'}
//               </p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-mint-green text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}
//                 >
//                   <Icon name="grid" className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-mint-green text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}
//                 >
//                   <Icon name="list-view" className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//             {renderItemsView()}
//           </>
//         ) : (
//           <WishlistSelectionView />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Favorites;
