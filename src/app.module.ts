import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { GeneralConfigModule } from './config/general-config.module';
import { DatabaseModule } from './config/database.module';

@Module({
  imports: [GeneralConfigModule, DatabaseModule, ChatModule],
})
export class AppModule {}
