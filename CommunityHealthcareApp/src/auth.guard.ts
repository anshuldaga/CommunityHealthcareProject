import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './app/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{
  
  constructor(private loginService: LoginService, private router: Router){}


  canActivate():boolean {
    console.log("~~~ START of canActivate");
    if(this.loginService.loggedIn()){
      console.log("loggedIn returned TRUE");
      return true
    }
    else{
      console.log("loggedIn returned FALUSE - take user to login page again");
      this.router.navigate(['/login'])
      return false
    }
  }

}
