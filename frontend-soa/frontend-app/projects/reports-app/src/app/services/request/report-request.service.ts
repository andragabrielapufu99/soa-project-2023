import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReportRequest} from "../../entities/report-request";

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

  getAllByEmail(email: string): Observable<ReportRequest[]> {
    let body = {'email': email};
    return this.http.post<ReportRequest[]>(`${this.server_uri}/all`, body, this.httpOptions);
  }

  addRequest(request: ReportRequest): Observable<ReportRequest> {
    return this.http.post<ReportRequest>(`${this.server_uri}/add`, request, this.httpOptions);
  }
}
