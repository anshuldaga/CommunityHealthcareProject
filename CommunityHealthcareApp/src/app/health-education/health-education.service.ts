import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HealthEducationService 
{
  public healthEducationTabs: any;

  constructor(public http: HttpClient)
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

  getEducationTab(educationTabId: string)
  {
    return{
      ...this.healthEducationTabs.find(educationTab =>{
        return educationTab.tab_title === educationTabId;
      })
    };
  }

}
