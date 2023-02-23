import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //do whatever you want with the HttpRequest
    console.log('Interceptor...');
    let unparsed = localStorage.getItem('token');
    if(unparsed !== null) {
      let token = JSON.parse(unparsed);
      let cloneReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token.access_token}`)});
      return next.handle(cloneReq); //invoke the next handler
    }else {
      return next.handle(req);   //invoke the next handler
    }
  }
}
