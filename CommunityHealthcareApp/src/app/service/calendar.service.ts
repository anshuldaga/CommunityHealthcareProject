import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) {

   }

   addEvent(title, description, startTime, endTime, location, isMedication):Observable<any>{
    return this.http
    .post('http://localhost:3000/calendar', {
      userId: 2,
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      location: location,
      isMedication: isMedication
    },
    {responseType: 'text'});
  }
}
