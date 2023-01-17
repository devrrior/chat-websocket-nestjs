import { Injectable } from '@nestjs/common';
import { ChatMessageEntity } from './chat-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatMessageResponse } from './dtos/responses/create-chat-message-response';
import { GetChatMessageResponse } from './dtos/responses/get-chat-message-response';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessageEntity)
    private repository: Repository<ChatMessageEntity>,
  ) {}

  async create(
    message: string,
    author: string,
    roomId: string,
  ): Promise<CreateChatMessageResponse> {
    const chatMessage = this.repository.create({ message, author, roomId });
    const chatMessageEntity = await this.repository.save(chatMessage);

    return this.toCreateChatMessageResponse(chatMessageEntity);
  }

  async getAll(): Promise<GetChatMessageResponse[]> {
    const chatMessageEntities = await this.repository.find();
    return chatMessageEntities.map((chatMessageEntity) =>
      this.toGetChatMessageResponse(chatMessageEntity),
    );
  }

  async getAllByRoomId(roomId: string): Promise<GetChatMessageResponse[]> {
    const chatMessageEntities = await this.repository.findBy({ roomId });
    return chatMessageEntities.map((chatMessageEntity) =>
      this.toGetChatMessageResponse(chatMessageEntity),
    );
  }

  private toCreateChatMessageResponse(
    request: ChatMessageEntity,
  ): CreateChatMessageResponse {
    const response = new CreateChatMessageResponse();
    response.message = request.message;
    response.author = request.author;
    response.createdAt = request.createdAt;

    return response;
  }

  private toGetChatMessageResponse(
    request: ChatMessageEntity,
  ): GetChatMessageResponse {
    const response = new GetChatMessageResponse();
    response.message = request.message;
    response.author = request.author;
    response.createdAt = request.createdAt;

    return response;
  }
}
