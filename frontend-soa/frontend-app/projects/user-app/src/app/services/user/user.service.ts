import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { User } from '../../entities/user';
import {Token} from "../../entities/token";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private server_uri: string = '/api';
  private httpOptions = {
    'headers': new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Token> {
    let body = {'email': email, 'password': password};
    return this.http.post<Token>(`${this.server_uri}/auth/login`, body, this.httpOptions);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.server_uri}/user/add`, user, this.httpOptions);
  }
}
