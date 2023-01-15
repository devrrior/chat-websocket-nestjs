import { IsNotEmpty, IsString } from 'class-validator';

export class LeaveRoom {
  @IsNotEmpty()
  @IsString()
  roomId: string;
}
