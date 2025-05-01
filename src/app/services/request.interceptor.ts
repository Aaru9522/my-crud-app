import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler)
    : Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('Token');
    if (token) {
      const clone = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(clone);
    }
    return next.handle(req);
  }
}
