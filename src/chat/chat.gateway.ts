import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Event } from './constants/event';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { WebsocketExceptionFilter } from './exceptions/websocket-exception.filter';
import { ChatMessage } from './dtos/chat-message';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat',
})
@UseFilters(new WebsocketExceptionFilter())
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('event_message')
  @UsePipes(new ValidationPipe())
  handleNewMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatMessageEvent: ChatMessage,
  ): void {
    const roomId = client.handshake.query.roomId;
    this.server
      .to(`room_${roomId}`)
      .emit(Event.onMessage, JSON.stringify(chatMessageEvent));
  }

  handleConnection(client: Socket): void {
    const roomId = client.handshake.query.roomId;
    client.join(`room_${roomId}`);
  }

  handleDisconnect(client: Socket): void {
    const roomId = client.handshake.query.roomId;
    client.leave(`room_${roomId}`);
  }
}
