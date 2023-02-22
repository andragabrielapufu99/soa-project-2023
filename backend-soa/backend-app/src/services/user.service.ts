import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { User } from 'src/entities';
import { USER_SERVICE } from 'src/my.constants';

@Injectable()
export class UserService {
    constructor(@Inject(USER_SERVICE) private readonly client: ClientProxy){} 
    
    getHello(): string {
        return 'Hello World!';
    }

    addUser(user: User): Observable<User> {
        const pattern = {cmd: 'add'};
        return this.client.send<User>(pattern, user);
    }

    updateUser(user: User): Observable<User> {
        const pattern = {cmd: 'update'};
        return this.client.send<User>(pattern, user);
    }

    login(credentials: any): Observable<User> {
        const pattern = {cmd: 'login'};
        return this.client.send<User>(pattern, credentials);
    }
}