import { IsNotEmpty, IsString } from 'class-validator';
import { MessageType } from '../../constants/messageType';

export class CreateChatMessageRequest {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsString()
  createdAt: Date;

  type: MessageType;
}
