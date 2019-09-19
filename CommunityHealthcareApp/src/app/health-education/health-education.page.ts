import { Component} from '@angular/core';
import { HealthEducationService } from './health-education.service';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Platform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-health-education',
  templateUrl: './health-education.page.html',
  styleUrls: ['./health-education.page.scss'],
})
export class HealthEducationPage{
  healthEducationTabs: any;  


  constructor(private healthEducationService: HealthEducationService, public http: HttpClient,
    public platform:Platform) 
  {
    this.loadData();
  }

  loadData()
  {
    let data:Observable<any>;
    data = this.http.get('http://localhost:3000/educationtabs');
    data.subscribe(result => {
        this.healthEducationTabs = result;
      })
  }
}
