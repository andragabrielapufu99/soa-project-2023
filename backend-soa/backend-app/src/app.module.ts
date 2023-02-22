import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { RequestController } from './controllers/request/request.controller';
import { ClientsModule, Transport }from '@nestjs/microservices';
import { provider_host } from './config';
import { USER_SERVICE, REQUEST_SERVICE, DOWNLOAD_SERVICE, AI_SERVICE } from './my.constants';
import { UserService } from './services/user.service';
import { RequestService } from './services/request.service';

@Module({
  imports: [
    ClientsModule.register([{
      name: USER_SERVICE,
      transport: Transport.TCP,
      options: { host: provider_host, port: 3001 }
    }]),
    ClientsModule.register([{
      name: REQUEST_SERVICE,
      transport: Transport.TCP,
      options: { host: provider_host, port: 3002 }
    }]),
    ClientsModule.register([{
      name: DOWNLOAD_SERVICE,
      transport: Transport.TCP,
      options: { host: provider_host, port: 3003 }
    }]),
    ClientsModule.register([{
      name: AI_SERVICE,
      transport: Transport.TCP,
      options: { host: provider_host, port: 3004 }
    }])
  ],
  controllers: [UserController, RequestController],
  providers: [UserService, RequestService],
})
export class AppModule {}
