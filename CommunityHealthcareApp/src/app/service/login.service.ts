import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient, private plt: Platform) { }//private storage: Storage,


  loginUser(username, password):Observable<any>{

    return this.http.post('http://localhost:3000/login/user',
    { 
      username: username, 
      password: password 
    });
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
