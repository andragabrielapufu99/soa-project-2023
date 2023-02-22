import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { reportRequestsProviders } from './database/report-requests.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ...reportRequestsProviders],
})
export class AppModule {}
