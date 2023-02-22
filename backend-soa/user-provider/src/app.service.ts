import { Injectable } from '@nestjs/common';
import { User } from './entities';

@Injectable()
export class AppService {
  private users: User[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  async addUser(user: User): Promise<User> {
    console.log('Add user', JSON.stringify(user));
    this.users.push(user);
    return await Promise.resolve(user);
  }
}
