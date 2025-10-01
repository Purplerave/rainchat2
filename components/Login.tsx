import React, { useState } from 'react';
import { UserID } from '../types';
import { Icon } from './icons';

interface LoginProps {
  onLogin: (userId: UserID) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (trimmedUsername === UserID.Purple || trimmedUsername === UserID.Rain) {
      setError(null);
      onLogin(trimmedUsername as UserID);
    } else {
      setError("Invalid name. Please enter 'Purple' or 'Rain'.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pr-dark text-pr-text p-4">
      <div className="w-full max-w-md bg-pr-mid rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-105 duration-500">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-pr-light rounded-full mb-4">
              <Icon name="logo" className="w-10 h-10 text-pr-accent"/>
          </div>
      <h1 className="text-6xl force-handlee mb-12 text-center">
        <span className="text-purple-700">Purple</span>
        <span className="text-amber-500">Rain</span>
        <span className="text-gray-800"> Chat</span>
      </h1>
          <p className="text-pr-accent mt-2">A private connection.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-center text-lg mb-2">
              Enter your name to join
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Purple or Rain"
              className="w-full p-3 bg-pr-light rounded-lg text-pr-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pr-purple transition duration-300"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full p-4 bg-amber-500 text-black font-semibold rounded-lg shadow-lg transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-pr-accent focus:ring-opacity-75 disabled:opacity-50"
            disabled={!username.trim()}
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};
