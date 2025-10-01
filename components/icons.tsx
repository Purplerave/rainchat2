
import React from 'react';

interface IconProps {
  name: 'send' | 'logo' | 'purple' | 'rain';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  switch (name) {
    case 'send':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className || 'w-6 h-6'}
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      );
    case 'logo':
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={className || 'w-8 h-8'}
            >
                <path d="M15.75 18.75a.75.75 0 00.75-.75V10.514l-4.78-4.041a.75.75 0 00-.94 0l-4.78 4.04V18a.75.75 0 00.75.75h9.75z" />
                <path fillRule="evenodd" d="M3 8.379a.75.75 0 01.44-.695l7.5-3.125a.75.75 0 01.62 0l7.5 3.125a.75.75 0 01.44.695v9.121a.75.75 0 01-.44.695l-7.5 3.125a.75.75 0 01-.62 0l-7.5-3.125a.75.75 0 01-.44-.695V8.379zM5.25 8.802l6-2.5 6 2.5v8.396l-6 2.5-6-2.5V8.802z" clipRule="evenodd" />
            </svg>
        );
    case 'purple':
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={className || 'w-10 h-10'}
            >
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
        )
    case 'rain':
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={className || 'w-10 h-10'}
            >
                <path d="M12 2.25a.75.75 0 01.75.75v16.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75z" />
                <path d="M12 2.25a.75.75 0 01.75.75v16.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75z" />
                <path d="M5.603 4.22a.75.75 0 01.428.925l-2.284 6.852a.75.75 0 01-1.356-.45l2.284-6.852a.75.75 0 01.928-.425z" />
                <path d="M18.397 4.22a.75.75 0 01.928.425l2.284 6.852a.75.75 0 01-1.356.45l-2.284-6.852a.75.75 0 01.428-.925z" />
                <path d="M8.496 3.47a.75.75 0 01.69.758L7.43 14.28a.75.75 0 01-1.428-.38l1.755-10.052a.75.75 0 01.739-.628z" />
                <path d="M15.504 3.47a.75.75 0 01.739.628l1.755 10.052a.75.75 0 01-1.428.38L14.814 4.228a.75.75 0 01.69-.758z" />
            </svg>
        )
    default:
      return null;
  }
};
