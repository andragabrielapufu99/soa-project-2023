import { Module } from '@nestjs/common';
import { AuthModule } from './controllers/auth/auth.module';
import { UserModule } from './controllers/user/user.module';
import { RequestModule } from './controllers/request/request.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RequestModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
