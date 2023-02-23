import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export  class AppHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //do whatever you want with the HttpRequest
    let unparsed = localStorage.getItem('token');
    if(unparsed !== null) {
      let token = JSON.parse(unparsed);
      req.headers.set('Authorization', `Bearer ${token.access_token}`);
      console.log('Intercept!', req);
    }
    return next.handle(req);   //invoke the next handler
  }
}
