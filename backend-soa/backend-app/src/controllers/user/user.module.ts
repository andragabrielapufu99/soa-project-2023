import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { provider_host } from 'src/config';
import { USER_SERVICE } from 'src/my.constants';
import { UserService } from 'src/services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([{
        name: USER_SERVICE,
        transport: Transport.TCP,
        options: { host: provider_host, port: 3001 }
      }])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}