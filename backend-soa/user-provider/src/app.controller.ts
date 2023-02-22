import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({cmd: 'add'})
  async addUser(user: User): Promise<User> {
    return this.appService.addUser(user);
  }
}
