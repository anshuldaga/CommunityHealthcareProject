import { Injectable } from '@angular/core';
import { Medication } from './medications.model'
import { BehaviorSubject } from 'rxjs';
import {take, map, tap, delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicationsService 
{
  public medications = new BehaviorSubject<Medication[]> ([
    new Medication("m1", "Tylenol", "For pain"),
    new Medication("m2", "Nyquil", "For cold")
  ]);

  getMedications()
  {
    return this.medications.asObservable();
  }

  getMedication(id: string)
  {
    return this.medications.pipe(
      take(1),
      map(medications => {
        return {...medications.find(p => p.id === id)};
      })
    );
  }

  addMedication(medication: string, notes: string)
  {
    const newMedication = new Medication(Math.random().toString(), medication, notes);
    return this.medications.pipe(
      take(1),
      delay(3000),
      tap(medications => {
          this.medications.next(medications.concat(newMedication));
      })
    );
  }

  deleteMedication(id: string)
  { 
    return this.medications.pipe(
      take(1),
      delay(3000),
      tap(medications => {
        this.medications.next(medications.filter(item => item.id !== id));
      })
    );
  }

  constructor() { }
}
