import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';

import App from './components/App.jsx';
import { SocketContext } from './contexts/index.js';
import { actions as channelsActions } from './slices/channelsSlice';
import store from './slices/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const addNewMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  });

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  const addNewChannel = (channel) => socket.emit('newChannel', channel, (response) => {
    try {
      const { id } = response.data;
      dispatch(channelsActions.setCurrentChannelId(id));
    } catch {
      throw new Error(response.status);
    }
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });

  return (
    <SocketContext.Provider
      value={{
        addNewMessage,
        addNewChannel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const init = (socket) => {
  const vdom = (
    <StoreProvider store={store}>
      <SocketProvider socket={socket}>
        <App />
      </SocketProvider>
    </StoreProvider>
  );

  return vdom;
};

export default init;
