import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { usersProviders } from './database/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ...usersProviders]
})
export class AppModule {}
