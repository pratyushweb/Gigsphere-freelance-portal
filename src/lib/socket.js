import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SOCKET_URL = BASE_URL.replace('/api', '') + '/chat';

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
