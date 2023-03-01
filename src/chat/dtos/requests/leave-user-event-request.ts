import { IsNotEmpty, IsString } from 'class-validator';

export class LeaveUserEventRequest {
  @IsNotEmpty()
  @IsString()
  username: string;
}
