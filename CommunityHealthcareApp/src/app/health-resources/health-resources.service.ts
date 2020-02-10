import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HealthResourcesService 
{
  public healthResources: any;

  constructor(public http: HttpClient)
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

  getResourcesTab(category: string)
  {
    return{
      ...this.healthResources.find(categories =>{
        return categories.category_title === category;
      })
    };
  }

  getDetailsTab(category: string, detail: string){
    let resourceTab = JSON.parse(this.getResourcesTab(category).all_resources);
    return{
      ...resourceTab.find(resources =>{
        return resources.resource_title === detail;
      })
    };
  }
}
