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
  constructor(
    private activatedRoute: ActivatedRoute,
    private healthResourceService: HealthResourcesService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('educationTabId')){
        return;
      }
      const educationTabId = paramMap.get('educationTabId');
      this.loadedTab = this.healthResourceService.getResourceTab(educationTabId);
    });
    
  }

}
