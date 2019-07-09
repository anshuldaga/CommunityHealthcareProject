import { Injectable } from '@angular/core';
import { Condition } from './conditions.model'
import { BehaviorSubject } from 'rxjs';
import {take, map, tap, delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ConditionsService 
{
  public conditions = new BehaviorSubject<Condition[]> ([
    new Condition("c1", "Knee Pain", "Had Surgery"),
    new Condition("c2", "Cancer", "It is Leukemia")
  ]);

  getConditions()
  {
    return this.conditions.asObservable();
  }

  getCondition(id: string)
  {
    return this.conditions.pipe(
        take(1),
        map(conditions => {
          return {...conditions.find(p => p.id === id)};
        })
      );
  }

  addCondition(condition: string, description: string)
  {
    const newCondition = new Condition(Math.random().toString(), condition, description);
    return this.conditions.pipe(
      take(1),
      delay(3000),
      tap(conditions => {
          this.conditions.next(conditions.concat(newCondition));
      })
    );
  }

  deleteCondition(id: string)
  {
    return this.conditions.pipe(
      take(1),
      delay(3000),
      tap(conditions => {
        this.conditions.next(conditions.filter(item => item.id !== id));
      })
    );
  }

  constructor() { }
}
