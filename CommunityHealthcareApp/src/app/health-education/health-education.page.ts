import { Component, OnInit } from '@angular/core';
import { EducationTab } from './health-education.model';
import { HealthEducationService } from './health-education.service';

@Component({
  selector: 'app-health-education',
  templateUrl: './health-education.page.html',
  styleUrls: ['./health-education.page.scss'],
})
export class HealthEducationPage implements OnInit {
  healthEducationTabs: EducationTab[];  

  constructor(private healthEducationService: HealthEducationService) { }

  ngOnInit() 
  {
    this.healthEducationTabs = this.healthEducationService.getAllEducationTabs();
  }

}
