import React, { useState, useEffect, useCallback } from 'react';
import { Login } from './components/Login';
import { ChatWindow } from './components/ChatWindow';
import { useWebSocket } from './hooks/useWebSocket';
import { UserID, MessageType } from './types';
import { WEBSOCKET_URL, ROOM_ID, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<UserID | null>(null);
  const { messages, sendMessage, connectionStatus, clearMessages, connect, isPurpleOnline } = useWebSocket(WEBSOCKET_URL);

  useEffect(() => {
    if (user && connectionStatus === 'Open') {
      const joinMessage = {
        type: MessageType.Join,
        roomId: ROOM_ID,
        userId: user,
      };
      sendMessage(joinMessage);
    }
  }, [user, connectionStatus, sendMessage]);

  const handleLogin = (userId: UserID) => {
    if (connectionStatus === 'Closed' || connectionStatus === 'Error') {
        clearMessages();
        connect();
    }
    
    setUser(userId);
  };
  
  const sendTelegramNotification = useCallback((message: string) => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('Telegram credentials are not set in constants.ts. Skipping notification.');
      return;
    }

    const notificationMessage = {
      type: MessageType.TelegramNotification,
      content: message,
    };
    sendMessage(notificationMessage);
  }, [sendMessage]);

  const handleSendMessage = (content: string) => {
    const chatMessage = {
      type: MessageType.ChatMessage,
      content: content,
    };
    sendMessage(chatMessage);
    
    // Send notification to Telegram if Rain sends a message and Purple is not online
    if (user === UserID.Rain && !isPurpleOnline) {
      sendTelegramNotification(content);
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ChatWindow
      user={user}
      messages={messages}
      sendMessage={handleSendMessage}
      connectionStatus={connectionStatus}
    />
  );
};

export default App;
