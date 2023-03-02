import { MessageType } from '../../constants/messageType';

export class MessageResponse {
  data: any;
  type: MessageType;
  author: string;
  createdAt: Date;
}
