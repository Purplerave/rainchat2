import { WebSocketServer, WebSocket } from 'ws';
import https from 'https';

// TODO: Move these to environment variables
const TELEGRAM_BOT_TOKEN = '7671177991:AAGYU1v73DczBj43sWXrH3_B7GVNUwqxQ4E';
const TELEGRAM_CHAT_ID = '475270820';

const wss = new WebSocketServer({ port: 8082 });

const rooms = {};

console.log('WebSocket server started on port 8082');

function sendTelegramNotification(messageContent) {
  if (!TELEGRAM_BOT_TOKEN.startsWith('your') && !TELEGRAM_CHAT_ID.startsWith('your')) {
    const payload = JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: `New message from Rain while you were away:\n\n"${messageContent}"`, // Corrected: escaped backslash for newline and escaped double quote
      parse_mode: 'Markdown',
    });

    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log('Telegram API response:', data);
      });
    });

    req.on('error', (error) => {
      console.error('Error sending Telegram notification:', error);
    });

    req.write(payload);
    req.end();
  } else {
    console.log('Skipping Telegram notification because credentials are not set in server.js');
  }
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      const { type, roomId, userId, content } = data;

      if (type === 'join') {
        if (!rooms[roomId]) {
          rooms[roomId] = new Set();
        }
        rooms[roomId].add(ws);
        ws.roomId = roomId;
        ws.userId = userId;
        broadcast(roomId, { type: 'status', content: `${userId} has joined` }, ws);
        console.log(`${userId} joined room ${roomId}`);
      } else if (type === 'chatMessage') {
        if (ws.roomId && ws.userId) {
          broadcast(ws.roomId, { type: 'chatMessage', userId: ws.userId, content, timestamp: new Date().toISOString() });
          console.log(`Message from ${ws.userId} in room ${ws.roomId}: ${content}`);
        } else {
          ws.send(JSON.stringify({ type: 'error', content: 'Cannot send message before joining a room.' }));
          console.log('Ignoring message from a client that has not joined a room.');
        }
      } else if (type === 'telegram_notification') {
        console.log(`Received request to send Telegram notification for message: ${content}`);
        sendTelegramNotification(content);
      }
    } catch (error) {
      console.error('Failed to parse message or handle client message:', error);
      ws.send(JSON.stringify({ type: 'error', content: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    if (ws.roomId && rooms[ws.roomId]) {
      rooms[ws.roomId].delete(ws);
      broadcast(ws.roomId, { type: 'status', content: `${ws.userId} has left` });
      console.log(`${ws.userId} left room ${ws.roomId}`);
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

function broadcast(roomId, message, excludeWs) {
  if (rooms[roomId]) {
    const messageString = JSON.stringify(message);
    for (const client of rooms[roomId]) {
      if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    }
  }
}