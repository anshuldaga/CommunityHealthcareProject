import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HealthResourcesService } from '../health-resources.service';
import { ResourcesTab } from '../health-resources.model';
@Component({
  selector: 'app-health-resources-tab',
  templateUrl: './health-resources-tab.page.html',
  styleUrls: ['./health-resources-tab.page.scss'],
})
export class HealthResourcesTabPage implements OnInit {
  loadedTab: ResourcesTab;
  showLevel: null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private healthResourceService: HealthResourcesService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('resourceTabId')){
        return;
      }
      const resourceTabId = paramMap.get('resourceTabId');
      this.loadedTab = this.healthResourceService.getResourceTab(resourceTabId);
    });
    
  }

  isLevelShown(index) 
  {
    return this.showLevel === index;
  };

  toggleLevel(index) 
  {
    if (this.isLevelShown(index)) 
    {
      this.showLevel = null;
    } 
    else 
    {
      this.showLevel = index;
    }
  };

}
