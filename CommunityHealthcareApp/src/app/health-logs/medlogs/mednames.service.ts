import { Injectable } from '@angular/core';
import { Mednames } from './mednames.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MednamesService {
  constructor(private http: HttpClient) {}

  public mednames = new BehaviorSubject<Mednames>(
    new Mednames(null, null, null, null, null, null, null, null)
  );

  fetchMednames() {
    return this.http
      .get<{ [key: string]: Mednames }>('http://localhost:3000/mednames/')
      .pipe(
        take(1),
        tap(res => {
          if (!(Object.keys(res).length === 0)) {
            this.mednames.next(
              new Mednames(
                res[0].id,
                res[0].userId,
                res[0].med1name,
                res[0].med2name,
                res[0].med3name,
                res[0].med1notes,
                res[0].med2notes,
                res[0].med3notes
              )
            );
          } else {
            this.mednames.next(
              new Mednames(null, null, null, null, null, null, null, null)
            );
          }
        })
      );
  }
}
