import { Injectable } from '@angular/core';
import { Information } from './information.model';
import { BehaviorSubject, of } from 'rxjs';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  constructor(private http: HttpClient) {}

  public information = new BehaviorSubject<Information>(
    new Information(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    )
  );

  fetchInformation() {
    return this.http
      .get<{ [key: string]: Information }>('http://localhost:3000/userhealth/')
      .pipe(
        take(1),
        map(res => {
          console.log(Object.keys(res));
          if (!(Object.keys(res).length === 0)) {
            this.information.next(
              new Information(
                res[0].userId,
                res[0].height_feet,
                res[0].height_inches,
                res[0].weight,
                res[0].bloodtype,
                res[0].primary_contact,
                res[0].secondary_contact,
                res[0].medical_insurance,
                res[0].dental_insurance,
                res[0].birthday,
                res[0].allergy_notes
              )
            );
          } else {
            this.information.next(
              new Information(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
              )
            );
          }
        })
      );
  }

  updateInformation(
    height_feet: number,
    height_inches: number,
    weight: number,
    bloodtype: string,
    primary_contact: number,
    secondary_contact: number,
    medical_insurance: string,
    dental_insurance: string,
    birthday: string,
    allergy_notes: string
  ) {
    return this.information.pipe(
      take(1),
      switchMap(information => {
        information = {
          userId: null,
          height_feet,
          height_inches,
          weight,
          bloodtype,
          primary_contact,
          secondary_contact,
          medical_insurance,
          dental_insurance,
          birthday,
          allergy_notes
        };
        return this.http.put('http://localhost:3000/userhealth/', information);
      }),
      tap(() => {
        this.information.next(
          new Information(
            null,
            height_feet,
            height_inches,
            weight,
            bloodtype,
            primary_contact,
            secondary_contact,
            medical_insurance,
            dental_insurance,
            birthday,
            allergy_notes
          )
        );
      })
    );
  }
}
