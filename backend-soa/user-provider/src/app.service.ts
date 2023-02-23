import { Injectable, Inject } from '@nestjs/common';
import { User } from './entities';
import { Model } from 'mongoose';

@Injectable()
export class AppService {

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async updateUser(user: User): Promise<User> {
    await this.userModel.findOneAndUpdate({email: user.email}, user);
    return await this.userModel.findOne({email: user.email}).exec();
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({email: email}).exec();
    return Promise.resolve(user);
  }
}
