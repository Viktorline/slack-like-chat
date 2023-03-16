import React from 'react';
import { Provider as StoreProvider, useDispatch, useSelector } from 'react-redux';
import App from './components/App.jsx';
import { SocketContext } from './contexts/index.js';
import { actions as channelsActions } from './slices/channelsSlice';
import store from './slices/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const addNewMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
    // return null;
  });

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  const addNewChannel = (channel) => socket.emit('newChannel', channel, (response) => {
    if (response.status !== 'ok') {
      const { id } = response.data;
      console.log(response.data);
      dispatch(channelsActions.setCurrentChannelId(id));
    } else {
      console.log(response.status);
    }
    // return null;
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  });

  socket.on('removeChannel', (payload) => {
    dispatch(channelsActions.removeChannel(payload));
    if (payload.id === currentChannelId) {
      dispatch(channelsActions.setCurrentChannelId(1));
    } else {
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
    }
  });

  return (
    <SocketContext.Provider
      value={{
        addNewMessage,
        addNewChannel,
        removeChannel,
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
