
export enum UserID {
  Purple = 'Purple',
  Rain = 'Rain',
}

export enum MessageType {
  Join = 'join',
  ChatMessage = 'chatMessage',
  Status = 'status',
  Error = 'error',
  TelegramNotification = 'telegram_notification',
}

export interface BaseMessage {
  type: MessageType;
  content: string;
}

export interface ChatMessage extends BaseMessage {
  type: MessageType.ChatMessage;
  roomId: string;
  userId: UserID;
  timestamp: number;
}

export interface StatusMessage extends BaseMessage {
  type: MessageType.Status;
}

export interface ErrorMessage extends BaseMessage {
  type: MessageType.Error;
}

export type AppMessage = ChatMessage | StatusMessage | ErrorMessage;

export type ConnectionStatus = 'Connecting' | 'Open' | 'Closed' | 'Error';
