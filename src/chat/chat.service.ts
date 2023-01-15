import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { Event } from './constants/event';
import { ChatMessageEvent } from './dtos/chat-message-event';

@Injectable()
export class ChatService {
  sendMessageToRoom(chatMessageEvent: ChatMessageEvent, server: Server): void {
    server.to(chatMessageEvent.roomId).emit(Event.onMessage, chatMessageEvent);
  }
}
