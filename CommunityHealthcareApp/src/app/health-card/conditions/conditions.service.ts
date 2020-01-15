import { Injectable } from '@angular/core';
import { Condition } from './conditions.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConditionsService {
  constructor(private http: HttpClient) {}
  public conditions = new BehaviorSubject<Condition[]>([]);

  fetchInformation() {
    return this.http
      .get<{ [key: string]: Condition }>('http://localhost:3000/usercondition/')
      .pipe(
        map(res => {
          const _conditions = [];
          if (Object.keys(res) != null) {
            for (const key in res) {
              if (res.hasOwnProperty(key)) {
                _conditions.push(
                  new Condition(
                    res[key].id,
                    null,
                    res[key].condition_name,
                    res[key].condition_notes
                  )
                );
              }
            }
            return _conditions;
          }
        }),
        tap(_conditions => {
          this.conditions.next(_conditions);
        })
      );
  }

  editCondition(id: number, condition_name: string, condition_notes: string) {
    const existingCondition = new Condition(
      id,
      0,
      condition_name,
      condition_notes
    );
    console.log(existingCondition);
    return this.http
      .put(`http://localhost:3000/usercondition/`, existingCondition)
      .pipe(
        switchMap(() => {
          return this.conditions;
        }),
        take(1),
        tap(conditions => {
          const itemIndex = conditions.findIndex(
            ev => ev.id === existingCondition.id
          );
          const updatedConditions = [...conditions];
          updatedConditions[itemIndex] = new Condition(
            existingCondition.id,
            existingCondition.userId,
            existingCondition.condition_name,
            existingCondition.condition_notes
          );
          this.conditions.next(updatedConditions);
        })
      );
  }

  getConditions() {
    return this.conditions.asObservable();
  }

  getCondition(id: number) {
    return this.conditions.pipe(
      take(1),
      map(conditions => {
        return { ...conditions.find(p => p.id === id) };
      })
    );
  }

  addCondition(condition: string, description: string) {
    const newCondition = new Condition(0, null, condition, description);

    return this.http
      .put(`http://localhost:3000/usercondition/`, newCondition)
      .pipe(
        switchMap(() => {
          return this.conditions;
        }),
        take(1),
        tap(conditions => {
          this.conditions.next(conditions.concat(newCondition));
        })
      );
  }

  deleteCondition(id: number) {
    return this.http.delete(`http://localhost:3000/usercondition/${id}/`).pipe(
      switchMap(() => {
        return this.conditions;
      }),
      take(1),
      tap(conditions => {
        this.conditions.next(conditions.filter(item => item.id !== id));
      })
    );
  }
}
