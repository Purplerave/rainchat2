
import React from 'react';
import { UserID, ConnectionStatus } from '../types';
import { Icon } from './icons';

interface ChatHeaderProps {
  user: UserID;
  connectionStatus: ConnectionStatus;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ user, connectionStatus }) => {
  // Forced update to ensure latest version is deployed
  const statusIndicator = {
    Connecting: { color: 'bg-yellow-500', text: 'Connecting...' },
    Open: { color: 'bg-green-500', text: 'Connected' },
    Closed: { color: 'bg-red-500', text: 'Disconnected' },
    Error: { color: 'bg-red-700', text: 'Connection Error' },
  };

  const { color, text } = statusIndicator[connectionStatus];
  
  return (
    <header className="bg-pr-mid p-4 flex justify-between items-center shadow-lg sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Icon name="logo" className="w-8 h-8 text-pr-purple"/>
        <h1 className="text-2xl font-bold text-white">PurpleRain Chat</h1>
      </div>
      <div className="flex items-center gap-4 text-right">
        <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color}`}></div>
                <p className="font-semibold text-white">{user}</p>
            </div>
            <p className="text-sm text-gray-400">{text}</p>
        </div>
      </div>
    </header>
  );
};
