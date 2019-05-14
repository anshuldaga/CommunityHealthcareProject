import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HealthEducationService } from '../health-education.service';
import { EducationTab } from '../health-education.model';

@Component({
  selector: 'app-health-education-tab',
  templateUrl: './health-education-tab.page.html',
  styleUrls: ['./health-education-tab.page.scss'],
})
export class HealthEducationTabPage implements OnInit {
  loadedTab: EducationTab;

  constructor(
    private activatedRoute: ActivatedRoute,
    private healthEducationService: HealthEducationService) { }

  ngOnInit() 
  {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('educationTabId')){
        return;
      }
      const educationTabId = paramMap.get('educationTabId');
      this.loadedTab = this.healthEducationService.getEducationTab(educationTabId);
    });
  }

}
