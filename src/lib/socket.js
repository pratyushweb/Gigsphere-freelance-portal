import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000/chat';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  auth: (cb) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    cb({ userId: user.id });
  }
});

/**
 * Connect to the chat socket
 */
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

/**
 * Disconnect from the chat socket
 */
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
