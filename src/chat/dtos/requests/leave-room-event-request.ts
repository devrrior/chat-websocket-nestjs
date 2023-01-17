import { IsNotEmpty, IsString } from 'class-validator';

export class LeaveRoomEventRequest {
  @IsNotEmpty()
  @IsString()
  roomId: string;
}
