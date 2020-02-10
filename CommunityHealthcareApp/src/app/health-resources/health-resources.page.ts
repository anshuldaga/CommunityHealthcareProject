import { Component} from '@angular/core';
import { HealthResourcesService } from './health-resources.service';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Platform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-health-resources',
  templateUrl: './health-resources.page.html',
  styleUrls: ['./health-resources.page.scss'],
})
export class HealthResourcesPage{
  healthResources: any;  


  constructor(private healthResourcesService: HealthResourcesService, public http: HttpClient,
    public platform:Platform) 
  {
    this.loadData();
  }

  loadData()
  {
    let data:Observable<any>;
    data = this.http.get('http://localhost:3000/resources');
    data.subscribe(result => {
        this.healthResources = result;
      })
  }
}
