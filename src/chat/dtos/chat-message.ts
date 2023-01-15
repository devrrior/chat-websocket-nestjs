import { IsNotEmpty, IsString } from 'class-validator';

export class ChatMessage {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  author: string;
}
