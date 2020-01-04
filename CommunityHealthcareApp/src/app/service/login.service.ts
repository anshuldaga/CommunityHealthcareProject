import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {Observable} from 'rxjs';
import { Platform } from '@ionic/angular';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { catchError } from 'rxjs/operators';

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
    })
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
        // return Observable.throw(error.message || "Server Error");
        return Observable.throw("Server Error");
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
