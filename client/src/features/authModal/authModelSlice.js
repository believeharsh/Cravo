import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  mode: 'login', // Can be 'login' or 'signup'
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
        state.mode = 'login'; // Default to login if payload is unexpected
      }
    },
    closeAuthModal: state => {
      state.isOpen = false;
    },
    setAuthModalMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { openAuthModal, closeAuthModal, setAuthModalMode } =
  authModalSlice.actions;

export default authModalSlice.reducer;
