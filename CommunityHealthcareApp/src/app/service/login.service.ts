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
    //console.log("~~~~~  Start of loggedIn method");
   /*  this.storage.get("token").then((getToken) =>{
      console.log("000000  Insde loggedIn --- DB storage token: " + getToken  );
    }      
    ) */

    //console.log("111 Insde loggedIn -- get token frm browser DB - token:" + this.storage. get('token'));
    //console.log("1111  Insde loggedIn -- from browser localStorage - myToken:" + localStorage.getItem("myToken"));

    /* DB storage token logic .. change it to loalStrorage one.. 
    return !!this.storage.get('token').then(res => {
      //console.log("Inside loggeIn 2 return get token res:" + res)
      //console.log(res);
    });
    */

    // @shish changing logic to localStorage token
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
