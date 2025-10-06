export const getNavItems = (
  isAuthenticated,
  cartCount,
  dispatch,
  openAuthSidebarAction,
  setIsProfileDropdownOpen
) => {
  const baseNavItems = [
    {
      id: 'offers',
      label: 'Offers',
      Iconname: 'tag',
      path: '/offers',
      badge: 'New',
      showOnMobile: true,
    },
    {
      id: 'corporate',
      label: 'Corporate',
      Iconname: 'building2',
      path: '/corporate',
      showOnMobile: true,
    },
    {
      id: 'help',
      label: 'Help',
      Iconname: 'help-circle',
      path: '/help',
      showOnMobile: true,
    },
    {
      id: 'cart',
      label: 'Cart ',
      Iconname: 'shopping-cart',
      path: '/cart',
      count: cartCount,
      showOnMobile: true,
    },
  ];

  if (isAuthenticated) {
    baseNavItems.push({
      id: 'profile',
      label: 'Profile',
      Iconname: 'user',
      path: '/profile/account', // Path for mobile
      action: () => setIsProfileDropdownOpen(prev => !prev), // Action for desktop
      showOnMobile: true,
    });
  } else {
    baseNavItems.push({
      id: 'signin',
      label: 'Sign In',
      Iconname: 'login',
      action: () => dispatch(openAuthSidebarAction()),
      showOnMobile: true,
    });
  }

  return baseNavItems;
};
