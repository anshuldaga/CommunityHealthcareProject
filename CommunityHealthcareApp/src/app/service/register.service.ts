import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {

   }

   registerUser(firstname, lastname, address, username, password):Observable<any>{
     return this.http
     .post('http://localhost:3000/signup/user', 
     {
       firstName: firstname,
       lastName: lastname,
       address: address,
       username: username,
       password: password
     });
   }
}
