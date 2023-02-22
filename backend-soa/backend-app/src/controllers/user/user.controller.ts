import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../../entities';
import { UserService } from 'src/services/user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }

  @Post('add')
  addUser(@Body() user: User): Observable<User> {
    return this.service.addUser(user);
  }
}
