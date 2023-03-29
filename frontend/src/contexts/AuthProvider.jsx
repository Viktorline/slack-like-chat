import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';

import { AuthContext } from './index.js';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
    navigate(routes.rootPagePath());
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
