import { Injectable, Injector } from '@angular/core';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private injector: Injector) { }

  // intercept(req, next) {
  //   let authService = this.injector.get(LoginService);
  //   let tokenizedReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${authService.getToken()}`
  //     }
  //   })
  //   return next.handle(tokenizedReq)
  // }
}
