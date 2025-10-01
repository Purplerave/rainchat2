
import React, { useState, useRef, useEffect } from 'react';
import { UserID, AppMessage, MessageType, ConnectionStatus } from '../types';
import { ChatHeader } from './ChatHeader';
import { Message } from './Message';
import { StatusDisplay } from './StatusMessage';
import { Icon } from './icons';

interface ChatWindowProps {
  user: UserID;
  messages: AppMessage[];
  sendMessage: (content: string) => void;
  connectionStatus: ConnectionStatus;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ user, messages, sendMessage, connectionStatus }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && connectionStatus === 'Open') {
      sendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-[250px_1fr] bg-[url('/PurpleRain.png')] bg-contain bg-top bg-no-repeat bg-fixed text-pr-text">
      {/* Sidebar for ChatHeader */}
      <aside className="hidden md:flex flex-col bg-pr-dark/80 p-4 border-r border-pr-mid shadow-lg">
        <ChatHeader user={user} connectionStatus={connectionStatus} />
        {/* Add more sidebar content here if needed */}
      </aside>

      {/* Main Chat Area */}
      <div className="flex flex-col">
        {/* Top bar for mobile (if sidebar is hidden) */}
        <div className="md:hidden bg-pr-dark/80 p-4 shadow-lg">
          <ChatHeader user={user} connectionStatus={connectionStatus} />
        </div>

        <main className="flex-1 overflow-y-auto p-4 scrollbar-thin">
          <div className="flex flex-col space-y-2">
            {messages.map((msg, index) => {
              if (msg.type === MessageType.ChatMessage) {
                return (
                  <Message
                    key={`${msg.timestamp}-${index}`}
                    message={msg}
                    isOwnMessage={msg.userId === user}
                  />
                );
              }
              if (msg.type === MessageType.Status || msg.type === MessageType.Error) {
                return <StatusDisplay key={`status-${index}`} message={msg} />;
              }
              return null;
            })}
            <div ref={messagesEndRef} />
          </div>
        </main>

        <footer className="p-4 bg-pr-mid/50">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={connectionStatus !== 'Open'}
              className="flex-1 p-3 bg-pr-mid rounded-lg text-pr-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pr-purple transition duration-300 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={connectionStatus !== 'Open' || !newMessage.trim()}
              className="p-3 bg-pr-purple text-white rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pr-dark focus:ring-pr-purple transition transform hover:scale-110 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="send" className="w-6 h-6" />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};
