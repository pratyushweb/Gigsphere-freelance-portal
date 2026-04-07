import { query } from '../config/db.js';

export const initChatSocket = (io) => {
  const chatNamespace = io.of('/chat');

  // Map to keep track of connected users: userId -> socketId
  const connectedUsers = new Map();

  chatNamespace.on('connection', (socket) => {
    // Assume authentication happens on handshake or initial auth event
    const userId = socket.handshake.auth.userId;
    
    if (userId) {
       connectedUsers.set(userId, socket.id);
       // Broadcast online status to all others
       socket.broadcast.emit('user_online', { userId });
       console.log(`User ${userId} connected to chat.`);
    }

    // Handle sending a message
    socket.on('send_message', async ({ contract_id, receiver_id, content }) => {
      try {
         // Save to DB
         const result = await query(
            `INSERT INTO messages (contract_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *`,
            [contract_id, userId, content]
         );
         const message = result.rows[0];

         // Send to receiver if online
         const receiverSocketId = connectedUsers.get(receiver_id);
         if (receiverSocketId) {
            chatNamespace.to(receiverSocketId).emit('receive_message', message);
         }

         // Acknowledge back to sender
         socket.emit('message_sent', message);

      } catch (err) {
         console.error('Socket message error:', err);
         socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('typing', ({ receiver_id }) => {
       const receiverSocketId = connectedUsers.get(receiver_id);
       if (receiverSocketId) {
          chatNamespace.to(receiverSocketId).emit('typing', { userId });
       }
    });

    socket.on('stop_typing', ({ receiver_id }) => {
       const receiverSocketId = connectedUsers.get(receiver_id);
       if (receiverSocketId) {
          chatNamespace.to(receiverSocketId).emit('stop_typing', { userId });
       }
    });

    socket.on('disconnect', () => {
      if (userId) {
         connectedUsers.delete(userId);
         socket.broadcast.emit('user_offline', { userId });
         console.log(`User ${userId} disconnected.`);
      }
    });
  });
};
