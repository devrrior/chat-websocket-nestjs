import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { GetChatMessageResponse } from './dtos/responses/get-chat-message-response';

@Controller('chat')
export class ChatController {
  constructor(private readonly service: ChatService) {}

  @Get('messages')
  async get(
    @Query() query: { roomId: string },
  ): Promise<GetChatMessageResponse[]> {
    if (query.roomId) return await this.service.getAllByRoomId(query.roomId);
    else return await this.service.getAll();
  }
}
