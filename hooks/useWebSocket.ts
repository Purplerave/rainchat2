import { useState, useRef, useEffect, useCallback } from 'react';
import { AppMessage, ConnectionStatus, MessageType } from '../types';

export const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<AppMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('Connecting');
  const [isPurpleOnline, setIsPurpleOnline] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    ws.current = new WebSocket(url);
    setConnectionStatus('Connecting');

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
      setConnectionStatus('Open');
    };

    ws.current.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data) as AppMessage;
        
        // Track Purple's connection status based on server messages
        if (messageData.type === MessageType.Status) {
            if (messageData.content.includes('Purple has joined')) {
                setIsPurpleOnline(true);
            } else if (messageData.content.includes('Purple has left')) {
                setIsPurpleOnline(false);
            }
        }

        setMessages((prevMessages) => [...prevMessages, messageData]);
      } catch (error) {
        console.error('Failed to parse incoming message:', error);
      }
    };

    ws.current.onerror = (event) => {
      console.error('WebSocket error:', event);
      setConnectionStatus('Error');
      setIsPurpleOnline(false); // Assume offline on error
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
      setConnectionStatus('Closed');
      setIsPurpleOnline(false); // Assume offline on close
    };
  }, [url]);

  useEffect(() => {
    connect();
    
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Changed [connect] to [] to prevent Strict Mode issues

  const sendMessage = useCallback((message: object) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  }, []);
  
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, sendMessage, connectionStatus, clearMessages, connect, isPurpleOnline };
};
