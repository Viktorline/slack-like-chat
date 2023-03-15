import { useContext } from 'react';

import { AuthContext, SocketContext } from '../contexts/index.js';

const useAuth = () => useContext(AuthContext);
const useSocket = () => useContext(SocketContext);

export { useAuth, useSocket };
