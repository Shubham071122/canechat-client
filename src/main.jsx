import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './components/redux/store.js';
import { AuthProvider } from './context/AuthContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <SearchProvider>
            <UserProvider>
              <SocketProvider>
                <App />
                <Toaster />
              </SocketProvider>
            </UserProvider>
          </SearchProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
