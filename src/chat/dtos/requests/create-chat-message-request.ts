import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatMessageRequest {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  author: string;
}
