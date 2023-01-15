import { ArgumentsHost, Catch, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch()
export class WebsocketExceptionFilter<T> implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost): any {
    const socket = host.switchToWs().getClient();
    socket.emit('onException', {
      status: 'error',
      message: exception.message,
    });
  }
}
