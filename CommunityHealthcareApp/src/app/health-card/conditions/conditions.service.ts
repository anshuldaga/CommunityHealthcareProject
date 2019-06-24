import { Injectable } from '@angular/core';
import { Condition } from './conditions.model'

@Injectable({
  providedIn: 'root'
})

export class ConditionsService 
{
  private conditions: Condition[] = [
    new Condition("c1", "Knee Pain", "Had Surgery"),
    new Condition("c2", "Cancer", "It is Leukemia")
  ];

  getConditions()
  {
    return [...this.conditions];
  }

  getCondition(id: string)
  {
    return {...this.conditions.find(p => p.id === id)};
  }

  addCondition(condition: string, description: string)
  {
    const newCondition = new Condition(Math.random().toString(), condition, description);
    this.conditions.push(newCondition);
  }

  constructor() { }
}
