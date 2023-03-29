import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import initSocket from '../initSocket.js';
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

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    navigate(routes.loginPagePath());
  }, [navigate]);

  useEffect(() => {
    if (user) {
      const socketInstance = initSocket(() => logOut());
      return () => {
        if (socketInstance.socket.connected) {
          socketInstance.socket.disconnect();
        }
      };
    }
    return undefined;
  }, [user, logOut]);

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
