import { Component, OnInit } from '@angular/core';
import { HealthEducationService } from './health-education.service';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

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

  constructor(private healthEducationService: HealthEducationService, public http: HttpClient) 
  {
    this.loadData();
  }

  loadData()
  {
    let data:Observable<any>;
    data = this.http.get('assets/information.json');
    data.subscribe(result => {
        this.healthEducationTabs = result;
      })
  }
}
