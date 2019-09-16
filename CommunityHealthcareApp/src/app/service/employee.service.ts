import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url: string = "http://localhost:3000/employees";

  constructor(private http: Http) {
    console.log('Hello Service Provider!');
   }

  //  getEmployees(){
  //    return this.http.get(this.url)
  //    .pipe(tap(res => console.log(res)));
  //  }

  getEmployees(){
    return this.http.get(this.url).pipe(map(response => response.json()));
  }
}
