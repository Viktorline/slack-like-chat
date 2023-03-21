import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

import Channels from './Channels/ChannelsBox.jsx';
import Messages from './Messages/MessagesBox.jsx';
import getModal from './modals/index.js';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const Chat = () => {
  const [modalType, setModalType] = useState(null);
  const [itemId, setItemId] = useState(null);

  const auth = useAuth();
  const dispatch = useDispatch();

  const showModal = (type, id = null) => {
    setModalType(type);
    setItemId(id);
  };

  const hideModal = () => {
    setModalType(null);
    setItemId(null);
  };

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

  const renderModal = (type, hide, id) => {
    if (!type) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal onHide={hide} id={id} />;
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels showModal={showModal} />
        <Messages />
      </div>
      {renderModal(modalType, hideModal, itemId)}
    </div>
  );
};

export default Chat;
