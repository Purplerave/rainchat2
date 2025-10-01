
import React from 'react';
import { ChatMessage, UserID } from '../types';

interface MessageProps {
  message: ChatMessage;
  isOwnMessage: boolean;
}

const formatTimestamp = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const Message: React.FC<MessageProps> = ({ message, isOwnMessage }) => {
  const { userId, content, timestamp } = message;

  const isPurple = userId === UserID.Purple;

  const containerClasses = isOwnMessage
    ? 'flex justify-end items-end'
    : 'flex justify-start items-end';
  
  const bubbleColorClass = userId === UserID.Purple
    ? 'bg-purple-600 text-white'   // Purple for Purple
    : 'bg-amber-400 text-black'; // Gold (Amber) for Rain

  const bubbleShapeClass = isOwnMessage
    ? 'rounded-t-2xl rounded-bl-2xl'
    : 'rounded-t-2xl rounded-br-2xl';

  const bubbleClasses = `${bubbleColorClass} ${bubbleShapeClass}`;


  return (
    <div className={`px-4 py-2 ${containerClasses}`}>
       <div className="flex flex-col max-w-xs md:max-w-md">
        <div className="flex items-center gap-2" style={{ flexDirection: isOwnMessage ? 'row-reverse' : 'row' }}>
            <p className={`text-xs font-semibold ${isPurple ? 'text-purple-400' : 'text-amber-500'}`}>
                {userId}
            </p>
            <p className="text-xs text-gray-500">{formatTimestamp(timestamp)}</p>
        </div>
        <div className={`p-4 mt-1 shadow-md ${bubbleClasses}`}>
          <p className="text-base break-words">{content}</p>
        </div>
      </div>
    </div>
  );
};
