import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportRequestService {
  private server_uri: string = '/api/request';
  private httpOptions = {
    'headers': new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
  }

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.post<any>(`${this.server_uri}/all`, this.httpOptions);
  }
}
