import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from './health-calendar.model';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthCalendarService {

  constructor(private http: HttpClient) {

   }

   public information = new BehaviorSubject<Appointment>(new Appointment(null, null, null, null, null));

   addEvent(title, description, startTime, endTime, location):Observable<any>{
    return this.http
    .post('http://localhost:3000/health-calendar', {
      userId: 877,
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      location: location
    },
    {responseType: 'text'});
  }

  fetchInformation() {
    return this.http.get("http://localhost:3000/health-calendar"); 
  };
}