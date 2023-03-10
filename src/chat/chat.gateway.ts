import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketEvent } from './constants/socketEvent';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateChatMessageRequest } from './dtos/requests/create-chat-message-request';
import { ChatService } from './chat.service';
import { JoinRoomEventRequest } from './dtos/requests/join-room-event-request';
import { LeaveRoomEventRequest } from './dtos/requests/leave-room-event-request';
import { NotificationMessage } from './constants/notificationMessage';
import { JoinUserEventRequest } from './dtos/requests/join-user-event-request';
import { LeaveUserEventRequest } from './dtos/requests/leave-user-event-request';
import { MessageResponse } from './dtos/responses/message-response';
import { CreateFileMessageRequest } from './dtos/requests/create-file-message-request';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat',
})
export class ChatGateway {
  constructor(private readonly service: ChatService) {}

  @WebSocketServer()
  server: Server;

  users: Set<string> = new Set<string>();

  @SubscribeMessage(SocketEvent.sendMessage)
  async handleNewMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() request: CreateChatMessageRequest,
  ): Promise<void> {
    console.log(`handleMessage: ${request}`);
    const roomId = request.roomId;
    // const createChatMessageResponse = await this.service.create(
    //   request.message,
    //   request.author,
    //   <string>roomId,
    // );
    const payload: MessageResponse = {
      data: { message: request.message },
      author: request.author,
      createdAt: request.createdAt,
      type: request.type,
    };
    this.server.to(`room_${roomId}`).emit(SocketEvent.getMessage, payload);
  }

  @SubscribeMessage(SocketEvent.sendFile)
  async handleNewFile(
    @ConnectedSocket() socket: Socket,
    @MessageBody() request: CreateFileMessageRequest,
  ): Promise<void> {
    const roomId = request.roomId;
    console.log(request);

    const payload: MessageResponse = {
      data: {
        file: request.file,
      },
      author: request.author,
      createdAt: request.createdAt,
      type: request.type,
    };

    console.log(`handleFile: ${payload.data.file.name}`);
    this.server.to(`room_${roomId}`).emit(SocketEvent.getFile, payload);
  }

  @SubscribeMessage(SocketEvent.joinRoom)
  @UsePipes(new ValidationPipe())
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() request: JoinRoomEventRequest,
  ): Promise<void> {
    const roomId = `room_${request.roomId}`;
    client.join(roomId);
  }

  @SubscribeMessage(SocketEvent.leaveRoom)
  @UsePipes(new ValidationPipe())
  async leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() request: LeaveRoomEventRequest,
  ): Promise<void> {
    const roomId = `room_${request.roomId}`;
    client.leave(roomId);
  }

  @SubscribeMessage(SocketEvent.joinUser)
  @UsePipes(new ValidationPipe())
  async joinUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() request: JoinUserEventRequest,
  ) {
    const username = request.username;

    if (this.users.has(username)) {
      this._sendNotification(
        client,
        NotificationMessage.usernameIsAlreadyTaken,
      );
      return;
    }

    this.users.add(username);
    this._sendNotification(
      client,
      NotificationMessage.authenticationSuccessful,
    );
  }

  @SubscribeMessage(SocketEvent.leaveUser)
  @UsePipes(new ValidationPipe())
  async leaveUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() request: LeaveUserEventRequest,
  ) {
    const username = request.username;

    if (!this.users.has(username)) return;

    this.users.delete(username);
  }

  _sendNotification(client: Socket, msg: string) {
    client.emit(SocketEvent.notifications, JSON.stringify({ msg }));
  }
}
