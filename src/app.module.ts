import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessageEntity } from './chat/chat-message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'chat_message_nestjs',
      entities: [ChatMessageEntity],
      synchronize: true,
    }),
    ChatModule,
  ],
})
export class AppModule {}
