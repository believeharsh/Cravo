// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isOpen: false,
//   mode: 'login', // Can be 'login' or 'signup'
// };

// const authModalSlice = createSlice({
//   name: 'authModal',
//   initialState,
//   reducers: {
//     openAuthModal: (state, action) => {
//       state.isOpen = true;
//       if (typeof action.payload === 'string') {
//         state.mode = action.payload;
//       } else if (action.payload?.mode) {
//         state.mode = action.payload.mode;
//       } else {
//         state.mode = 'login'; // Default to login if payload is unexpected
//       }
//     },
//     closeAuthModal: state => {
//       state.isOpen = false;
//     },
//     setAuthModalMode: (state, action) => {
//       state.mode = action.payload;
//     },
//   },
// });

// export const { openAuthModal, closeAuthModal, setAuthModalMode } =
//   authModalSlice.actions;

// export default authModalSlice.reducer;

// src/features/authModal/authModelSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  mode: 'login', // 'login' or 'signup'
  showOTPModal: false, // NEW: State to control OTP modal visibility
  signupEmail: '', // NEW: State to store the email for verification
};

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    openAuthModal: (state, action) => {
      state.isOpen = true;
      if (typeof action.payload === 'string') {
        state.mode = action.payload;
      } else if (action.payload?.mode) {
        state.mode = action.payload.mode;
      } else {
        state.mode = 'login';
      }
    },
    closeAuthModal: state => {
      state.isOpen = false;
      // NEW: Reset all states when the main modal is closed
      state.showOTPModal = false;
      state.signupEmail = '';
    },
    setAuthModalMode: (state, action) => {
      state.mode = action.payload;
    },
    // NEW: Action to open the OTP modal after successful signup
    openOTPModal: (state, action) => {
      state.isOpen = true; // Keep the main sidebar visible in the background
      state.showOTPModal = true; // Show the OTP modal
      state.signupEmail = action.payload; // Set the email from the signup form
    },
    // NEW: Action to close just the OTP modal
    closeOTPModal: state => {
      state.showOTPModal = false;
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  setAuthModalMode,
  openOTPModal,
  closeOTPModal,
} = authModalSlice.actions;

export default authModalSlice.reducer;
