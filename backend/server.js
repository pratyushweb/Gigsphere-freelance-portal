import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { initChatSocket } from './sockets/chat.socket.js';

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Attach socket namespaces
initChatSocket(io);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 GigSphere Backend running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`🔌 Socket.IO initialized`);
});
