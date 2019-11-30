import { Injectable } from '@angular/core';
import { event } from './logs.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  constructor(private http: HttpClient) {}

  day = new Date();
  public eventSource = new BehaviorSubject<event[]>([]);

  fetchLogs() {
    return this.http
      .get<{ [key: string]: event }>('http://localhost:3000/log/')
      .pipe(
        map(res => {
          if (!(Object.keys(res).length === 0)) {
            // tslint:disable-next-line: variable-name
            const _eventSource = [];
            for (const key in res) {
              if (res.hasOwnProperty(key)) {
                // tslint:disable-next-line: max-line-length
                _eventSource.push(
                  new event(
                    res[key].id,
                    res[key].userId,
                    new Date(res[key].startTime),
                    new Date(res[key].endTime),
                    true,
                    res[key].isInsulin,
                    res[key].isBP,
                    res[key].isBG,
                    res[key].insulinValue,
                    res[key].BPValue,
                    res[key].BGValue
                  )
                );
              }
            }
            return _eventSource;
          }
        }),
        // tslint:disable-next-line: variable-name
        tap(_eventSource => {
          this.eventSource.next(_eventSource);
        })
      );
  }

  getEvent(date: Date) {
    return this.eventSource.pipe(
      take(1),
      map(eventSource => {
        return {
          ...eventSource.find(p => p.endTime.getDate() === date.getDate())
        };
      })
    );
  }

  add(day: Date, property: string) {
    const eventCopy = {
      startTime: new Date(day),
      endTime: new Date(day),
      allDay: true,
      isInsulin: false,
      isBP: false,
      isBG: false,
      insulinValue: null,
      BPValue: null,
      BGValue: null
    };
    if (eventCopy.allDay) {
      eventCopy.startTime = new Date(
        Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate())
      );
      eventCopy.endTime = new Date(
        Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate() + 1)
      );
      // tslint:disable-next-line: triple-equals
      if (property == 'isInsulin') {
        eventCopy.isInsulin = true;
        // tslint:disable-next-line: triple-equals
      } else if (property == 'isBP') {
        eventCopy.isBP = true;
        // tslint:disable-next-line: triple-equals
      } else if (property == 'isBG') {
        eventCopy.isBG = true;
      }
    }
    const ev = new event(
      0,
      null,
      eventCopy.startTime,
      eventCopy.endTime,
      eventCopy.allDay,
      eventCopy.isInsulin,
      eventCopy.isBP,
      eventCopy.isBG,
      eventCopy.insulinValue,
      eventCopy.BPValue,
      eventCopy.BGValue
    );
    return this.http.put(`http://localhost:3000/log/`, ev).pipe(
      switchMap(() => {
        return this.eventSource;
      }),
      take(1),
      tap(eventSource => {
        this.eventSource.next(eventSource.concat(ev));
      })
    );
  }

  delete(ev: event) {
    const id = ev.id;
    return this.http.delete(`http://localhost:3000/log/${id}/`).pipe(
      switchMap(() => {
        return this.eventSource;
      }),
      take(1),
      tap(eventSource => {
        this.eventSource.next(eventSource.filter(item => item.id !== ev.id));
      })
    );
  }

  update(eventCopy: event) {
    return this.http.put(`http://localhost:3000/log/`, eventCopy).pipe(
      switchMap(() => {
        return this.eventSource;
      }),
      take(1),
      tap(eventSource => {
        const eventIndex = eventSource.findIndex(
          ev => ev.endTime.getDate() === eventCopy.endTime.getDate()
        );
        const updatedEvents = [...eventSource];
        updatedEvents[eventIndex] = new event(
          eventCopy.id,
          eventCopy.userId,
          eventCopy.startTime,
          eventCopy.endTime,
          eventCopy.allDay,
          eventCopy.isInsulin,
          eventCopy.isBP,
          eventCopy.isBG,
          eventCopy.insulinValue,
          eventCopy.BPValue,
          eventCopy.BGValue
        );
        this.eventSource.next(updatedEvents);
      })
    );
  }
}
