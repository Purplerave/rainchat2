
import React from 'react';
import { ErrorMessage, StatusMessage } from '../types';

interface StatusMessageProps {
  message: StatusMessage | ErrorMessage;
}

export const StatusDisplay: React.FC<StatusMessageProps> = ({ message }) => {
  const isError = message.type === 'error';
  const styleClasses = isError 
    ? 'text-red-400 bg-red-500/10'
    : 'text-gray-400 bg-pr-mid/50';

  return (
    <div className="px-4 py-2 flex justify-center">
      <div className={`text-xs italic px-3 py-1 rounded-full ${styleClasses}`}>
        {message.content}
      </div>
    </div>
  );
};
