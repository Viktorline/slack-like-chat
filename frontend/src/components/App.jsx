import React, { useMemo, useState } from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Chat from './Chat.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';
import PageNotFound from './PageNotFound.jsx';
import Registration from './Registration.jsx';

import { AuthContext } from '../contexts/index.js';
import { useAuth } from '../hooks/index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }
    return {};
  };

  const memoOnAuth = useMemo(
    () => ({
      logIn,
      logOut,
      getAuthHeader,
      user,
    }),
    [user],
  );

  return <AuthContext.Provider value={memoOnAuth}>{children}</AuthContext.Provider>;
};

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
          <Route path="" element={<LoginRoute />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
