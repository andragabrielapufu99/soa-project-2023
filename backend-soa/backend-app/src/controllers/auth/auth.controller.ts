import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

//   @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() credentials: any): Observable<any> {
        // console.log('Credentials', credentials);
        return this.authService.login(credentials);
        // return Promise.resolve(new Observable((s) => s.next(token)));
    }
}