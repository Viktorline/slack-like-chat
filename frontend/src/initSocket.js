import { io } from 'socket.io-client';

import { actions as channelsActions } from './slices/channelsSlice.js';
import store from './slices/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';

const initSocket = (onDisconnect) => {
  const socket = io();

  socket.on('connect_error', () => {
    if (typeof onDisconnect === 'function') {
      onDisconnect();
    }
  });

  const addNewMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.error(response.status);
    }
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });

  const addNewChannel = (channel, callback) => socket.emit('newChannel', channel, ({ data, status }) => {
    if (status === 'ok') {
      callback(data.id);
    } else {
      console.error(status);
    }
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'ok') {
      console.error(response.status);
    }
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.removeChannel(payload));
  });

  const renameChannel = (renamedChannel) => socket.emit('renameChannel', renamedChannel, (response) => {
    if (response.status !== 'ok') {
      console.error(response.status);
    }
  });

  socket.on('renameChannel', (payload) => {
    const { name, id } = payload;
    store.dispatch(
      channelsActions.renameChannel({
        id,
        changes: {
          name,
        },
      }),
    );
  });

  return {
    socket,
    addNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};

export default initSocket;
