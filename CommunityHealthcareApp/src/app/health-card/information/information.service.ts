import { Injectable } from '@angular/core';
import { Information } from './information.model'
import { BehaviorSubject } from 'rxjs';
import {take, delay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  public information = new BehaviorSubject<Information>(new Information("i1", 5, 11, 120, "A+", 8787686, 678678678, 
  "health partners", "delta dental", "May 05, 1984", "Peanuts, dairy"));

  getInformation()
  {
    return this.information.asObservable();
  }

  updateInformation(height_feet: number,
    height_inches: number,
    weight: number,
    bloodtype: string,
    primary_contact: number,
    secondary_contact: number,
    medical_insurance: string,
    dental_insurance: string, 
    birthday: string,
    allergy_notes: string)
  {
   /* this.information.pipe(take(1)).subscribe(information => {
      this.information.next(new Information('dummyID', height_feet, height_inches, weight,
        bloodtype, primary_contact, secondary_contact, medical_insurance, dental_insurance,
        birthday, allergy_notes));
    });*/
    return this.information.pipe(
      take(1),
      delay(3000),
      tap(information => {
        this.information.next(new Information('dummyID', height_feet, height_inches, weight,
        bloodtype, primary_contact, secondary_contact, medical_insurance, dental_insurance,
        birthday, allergy_notes));
      })
    );
  }

  constructor() { }
}
