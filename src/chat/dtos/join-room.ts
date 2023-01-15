import { IsNotEmpty, IsString } from 'class-validator';

export class JoinRoom {
  @IsNotEmpty()
  @IsString()
  roomId: string;
}
