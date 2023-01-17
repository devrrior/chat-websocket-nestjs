import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Event } from './constants/event';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { WebsocketExceptionFilter } from './exceptions/websocket-exception.filter';
import { CreateChatMessageRequest } from './dtos/requests/create-chat-message-request';
import { ChatService } from './chat.service';
import JoinRoomEventRequest from './dtos/requests/join-room-event-request';
import LeaveRoomEventRequest from './dtos/requests/leave-room-event-request';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat',
})
@UseFilters(new WebsocketExceptionFilter())
export class ChatGateway {
  constructor(private readonly service: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(Event.sendMessage)
  @UsePipes(new ValidationPipe())
  async handleNewMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() request: CreateChatMessageRequest,
  ): Promise<void> {
    const roomId = client.handshake.query.roomId;
    const createChatMessageResponse = await this.service.create(
      request.message,
      request.author,
      <string>roomId,
    );
    this.server
      .to(`room_${roomId}`)
      .emit(Event.getMessage, JSON.stringify(createChatMessageResponse));
  }

  @SubscribeMessage(Event.joinRoom)
  @UsePipes(new ValidationPipe())
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() request: JoinRoomEventRequest,
  ) {
    const roomId = `room_${request.roomId}`;
    client.join(roomId);
  }

  @SubscribeMessage(Event.leaveRoom)
  @UsePipes(new ValidationPipe())
  async leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() request: LeaveRoomEventRequest,
  ) {
    const roomId = `room_${request.roomId}`;
    client.leave(roomId);
  }
}
