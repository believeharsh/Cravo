import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import { Toaster } from 'react-hot-toast';

import { setupInterceptors } from './api/axiosInstance.js';
import { logout, setAuthState } from './features/auth/authSlice';

setupInterceptors({
  dispatch: store.dispatch,
  getState: store.getState,
  logoutAction: logout,
  setAuthStateAction: setAuthState,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="bottom-center" />
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
