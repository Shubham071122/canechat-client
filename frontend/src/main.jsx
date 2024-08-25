import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './components/redux/store.js';
import { AuthProvider } from './context/AuthContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <SearchProvider>
          <App />
        <Toaster />
        </SearchProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
);
