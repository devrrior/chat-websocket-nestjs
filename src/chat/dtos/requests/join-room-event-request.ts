import { IsNotEmpty, IsString } from 'class-validator';

export class JoinRoomEventRequest {
  @IsNotEmpty()
  @IsString()
  roomId: string;
}
