import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';
import { setupInterceptors } from './api/axiosInstance.js';
import store from './app/store';
import { logout, setAuthState } from './features/auth/authSlice';
import './index.css';

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
