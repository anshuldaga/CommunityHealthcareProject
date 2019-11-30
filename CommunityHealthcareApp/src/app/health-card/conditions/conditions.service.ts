import { Injectable } from '@angular/core';
import { Condition } from './conditions.model'
import { BehaviorSubject } from 'rxjs';
import {take, map, tap, switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ConditionsService {
  constructor(private http: HttpClient) {}
  public conditions = new BehaviorSubject<Condition[]> ([]);

  fetchInformation(){
    return this.http.get<{[key: string]: Condition}>('http://localhost:3000/usercondition/8778/').pipe(
      map(res => {
        if(!(Object.keys(res).length === 0)) {
          const _conditions = [];
          for(const key in res){
            if(res.hasOwnProperty(key)){
              _conditions.push(new Condition(res[key].id, 8778, res[key].condition_name, res[key].condition_notes));
            }
          }
          return _conditions;
        }
    }),
    tap(_conditions => {
      this.conditions.next(_conditions);
    }
    ));
  }

  getConditions(){
    return this.conditions.asObservable();
  }

  getCondition(id: number){
    return this.conditions.pipe(
        take(1),
        map(conditions => {
          return {...conditions.find(p => p.id === id)};
        })
      );
  }

  addCondition(condition: string, description: string)
  {
    const newCondition = new Condition(0, 8778, condition, description);

    return this.http.put(`http://localhost:3000/usercondition/`, newCondition).pipe(
      switchMap(() => {
        return this.conditions;
      }), 
      take(1),
      tap(conditions => {
          this.conditions.next(conditions.concat(newCondition));
      })
    );
  }

  deleteCondition(id: number)
  {
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
