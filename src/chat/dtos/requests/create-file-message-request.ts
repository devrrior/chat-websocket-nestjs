import { IsNotEmpty, IsString } from 'class-validator';
import { MessageType } from '../../constants/messageType';

export class CreateFileMessageRequest {
  file: any;

  author: string;

  roomId: string;

  createdAt: Date;

  type: MessageType;
}
