import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/index.js';
import routes from '../routes.js';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const Chat = () => {
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default Chat;
