import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessageEntity } from './chat-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessageEntity])],
  providers: [ChatGateway, ChatService],
  // controllers: [ChatController],
})
export class ChatModule {}
