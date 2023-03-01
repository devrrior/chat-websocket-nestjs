import { IsNotEmpty, IsString } from 'class-validator';

export class JoinUserEventRequest {
  @IsNotEmpty()
  @IsString()
  username: string;
}
