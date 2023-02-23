import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { provider_host } from 'src/config';
import { AI_SERVICE, DOWNLOAD_SERVICE, REQUEST_SERVICE } from 'src/my.constants';
import { RequestService } from 'src/services/request.service';
import { RequestController } from './request.controller';
import { RequestWsGateway } from './request.ws-gateway';

@Module({
  imports: [
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
      }]),
  ],
  controllers: [RequestController],
  providers: [RequestService, RequestWsGateway],
  exports: [RequestService],
})
export class RequestModule {
}