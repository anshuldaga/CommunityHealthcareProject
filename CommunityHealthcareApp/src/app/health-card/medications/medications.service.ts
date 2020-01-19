import { Injectable } from '@angular/core';
import { Medication } from './medications.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {
  constructor(private http: HttpClient) {}
  public medications = new BehaviorSubject<Medication[]>([]);

  fetchMedication() {
    return this.http
      .get<{ [key: string]: Medication }>(
        'http://localhost:3000/usermedication/'
      )
      .pipe(
        map(res => {
          if (Object.keys(res) != null) {
            const _medications = [];
            for (const key in res) {
              if (res.hasOwnProperty(key)) {
                _medications.push(
                  new Medication(
                    res[key].id,
                    null,
                    res[key].medication_name,
                    res[key].medication_notes
                  )
                );
              }
            }
            return _medications;
          }
        }),
        tap(_medications => {
          this.medications.next(_medications);
        })
      );
  }

  getMedications() {
    return this.medications.asObservable();
  }

  getMedication(id: number) {
    return this.medications.pipe(
      take(1),
      map(medications => {
        return { ...medications.find(p => p.id === id) };
      })
    );
  }

  editMedication(
    id: number,
    medication_name: string,
    medication_notes: string
  ) {
    const existingMedication = new Medication(
      id,
      0,
      medication_name,
      medication_notes
    );
    console.log(existingMedication);
    return this.http
      .put(`http://localhost:3000/usermedication/`, existingMedication)
      .pipe(
        switchMap(() => {
          return this.medications;
        }),
        take(1),
        tap(medications => {
          const itemIndex = medications.findIndex(
            ev => ev.id === existingMedication.id
          );
          const updatedMedications = [...medications];
          updatedMedications[itemIndex] = new Medication(
            existingMedication.id,
            existingMedication.userId,
            existingMedication.medication_name,
            existingMedication.medication_notes
          );
          this.medications.next(updatedMedications);
        })
      );
  }

  addMedication(medication_name: string, medication_notes: string) {
    const newMedication = new Medication(
      0,
      0,
      medication_name,
      medication_notes
    );
    return this.http
      .put(`http://localhost:3000/usermedication/`, newMedication)
      .pipe(
        switchMap(() => {
          return this.medications;
        }),
        take(1),
        tap(medications => {
          this.medications.next(medications.concat(newMedication));
        })
      );
  }

  deleteMedication(id: number) {
    return this.http.delete(`http://localhost:3000/usermedication/${id}/`).pipe(
      switchMap(() => {
        return this.medications;
      }),
      take(1),
      tap(medications => {
        this.medications.next(medications.filter(item => item.id !== id));
      })
    );
  }
}
