import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { map, Observable } from 'rxjs';
import { User } from 'src/entities';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    this.userService.getByEmail(email).subscribe(user => {
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
          }
          return null;
    });
    // console.log('validateUser', email, pass)
    
  }

  getByEmail(email: string): Observable<User> {
    return this.userService.getByEmail(email);
}

  login(credentials: any): Observable<any> {
        return this.getByEmail(credentials.email)
          .pipe(
            map((user) => {
              if(user && user.password === credentials.password){
                const payload = { email: credentials.email, password: credentials.password };
                let token = {access_token: this.jwtService.sign(payload), email: user.email};
                return token;
              }
              return null;
            })
          );
    }
}