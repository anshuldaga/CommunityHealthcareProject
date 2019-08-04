import { Component } from '@angular/core';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    //name: string;

    constructor(private http: Http) {

    }

    checkName() {

        /*let data = {
            name: this.name
        };

        /this.http.post('http://localhost:8080/checkname', data).pipe(
            map(res => res.json())
        ).subscribe(response => {
            console.log('POST Response:', response);
        });*/

        this.http.get('http://localhost:8080/educationTab/').pipe(
            map(res => res.json())
        ).subscribe(response => {
            console.log('GET Response:', response);
        });

    }

}
