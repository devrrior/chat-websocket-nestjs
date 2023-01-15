import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [ChatModule],
  providers: [ChatService],
})
export class AppModule {}
