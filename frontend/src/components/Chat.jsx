import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import useAuth from '../hooks/index.js';
import routes from '../routes.js';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import getModal from './modals/index.js';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const Chat = () => {
  const [modalType, setModalType] = useState(null);
  const auth = useAuth();
  const dispatch = useDispatch();

  const showModal = (type) => setModalType(type);
  const hideModal = () => setModalType(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });

      const { channels, currentChannelId, messages } = response.data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchData();
  });

  const renderModal = (type, hide) => {
    if (!type) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal onHide={hide} />;
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels showModal={showModal} />
        <Messages />
      </div>
      {renderModal(modalType, hideModal)}
    </div>
  );
};

export default Chat;
