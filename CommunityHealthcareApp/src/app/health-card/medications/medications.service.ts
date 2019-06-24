import { Injectable } from '@angular/core';
import { Medication } from './medications.model'

@Injectable({
  providedIn: 'root'
})
export class MedicationsService 
{
  private medications: Medication[] = [
    new Medication("m1", "Tylenol", "For pain"),
    new Medication("m2", "Nyquil", "For cold")
  ];

  getMedications()
  {
    return [...this.medications];
  }

  getMedication(id: string)
  {
    return {...this.medications.find(p => p.id === id)};
  }

  addMedication(medication: string, notes: string)
  {
    const newMedication = new Medication(Math.random().toString(), medication, notes);
    this.medications.push(newMedication);
  }

  constructor() { }
}
