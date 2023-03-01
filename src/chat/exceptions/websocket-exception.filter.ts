import { ArgumentsHost, Catch, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { SocketEvent } from '../constants/socketEvent';

@Catch()
export class WebsocketExceptionFilter<T> implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost): any {
    const socket = host.switchToWs().getClient();
    socket.emit(SocketEvent.onException, {
      status: 'ERROR',
      message: exception.message,
    });
  }
}
