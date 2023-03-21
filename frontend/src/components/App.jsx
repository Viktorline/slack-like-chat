import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '../contexts/AuthProvider.jsx';
import { useAuth } from '../hooks/index.js';

import Chat from './Chat.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';
import PageNotFound from './PageNotFound.jsx';
import Registration from './Registration.jsx';

const LoginRoute = () => {
  const auth = useAuth();
  return auth.user ? <Chat /> : <Navigate to="login" />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column vh-100">
        <Header />
        <Routes>
          <Route path="/" element={<LoginRoute />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
