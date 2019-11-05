import { Injectable, Injector } from '@angular/core';
import { LoginService } from '../service/login.service';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {

    const idtoken = localStorage.getItem('token');

    if(idtoken){

      const cloned = req.clone({
        headers: req.headers.set("authorization", "Bearer " + idtoken)
      });
      return next.handle(cloned);
    }
    else{
      return next.handle(req);
    }
  }
}
