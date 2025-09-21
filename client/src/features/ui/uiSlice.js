import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Nested state for the Auth Sidebar and related modals
  auth: {
    isAuthSidebarOpen: false,
    mode: 'login',
    showOTPModal: false,
    signupEmail: '',
  },

  // State for the Wishlist Modal
  wishlist: {
    isWishlistModalOpen: false,
    modalProductData: null,
    modalProps: null,
  },

  // state for the cart modal
  cart: {
    isDeleteModalOpen: false,
    modalProps: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Actions for the Auth Sidebar
    openAuthSidebar: (state, action) => {
      console.log('this reducers is being called');
      state.auth.isAuthSidebarOpen = true;
      if (typeof action.payload === 'string') {
        state.auth.mode = action.payload;
      } else if (action.payload?.mode) {
        state.auth.mode = action.payload.mode;
      } else {
        state.auth.mode = 'login';
      }
    },

    closeAuthSidebar: state => {
      state.auth.isAuthSidebarOpen = false;
      // Reset nested auth states on close
      state.auth.showOTPModal = false;
      state.auth.signupEmail = '';
      state.auth.mode = 'login';
    },

    setAuthMode: (state, action) => {
      state.auth.mode = action.payload;
    },

    // Actions for the OTP Modal (nested within auth)
    openOTPModal: (state, action) => {
      state.auth.isAuthSidebarOpen = true; // Keep the main sidebar visible
      state.auth.showOTPModal = true;
      state.auth.signupEmail = action.payload;
    },

    closeOTPModal: state => {
      state.auth.showOTPModal = false;
    },

    // Actions for the Wishlist Modal
    openWishlistModal: (state, action) => {
      state.wishlist.isWishlistModalOpen = true;
      state.wishlist.modalProps = action.payload;
      console.log('action payload', action.payload);
    },

    closeWishlistModal: state => {
      state.wishlist.isWishlistModalOpen = false;
      state.wishlist.modalProductData = null;
    },

    // Actions for the Cart Modal
    openDeleteModal: (state, action) => {
      state.cart.isDeleteModalOpen = true;
      state.cart.modalProps = action.payload;
      console.log('modal props for the openDeleteModal is ', action.payload);
      console.log('modap prop state', state.isDeleteModalOpen);
    },

    closeDeleteModal: state => {
      state.cart.isDeleteModalOpen = false;
      state.cart.modalProps = null;
    },
  },
});

export const {
  openAuthSidebar,
  closeAuthSidebar,
  setAuthMode,
  openOTPModal,
  closeOTPModal,
  openWishlistModal,
  closeWishlistModal,
  openDeleteModal,
  closeDeleteModal,
} = uiSlice.actions;

export default uiSlice.reducer;
