import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HealthEducationService } from '../health-education.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-health-education-tab',
  templateUrl: './health-education-tab.page.html',
  styleUrls: ['./health-education-tab.page.scss'],
})

export class HealthEducationTabPage implements OnInit {
  loadedTab: any;
  showLevel: null;
  healthEducationTabs: any;

  constructor(private activatedRoute: ActivatedRoute,
    private healthEducationService: HealthEducationService,
    private domSanitizer: DomSanitizer,) 
    {
    }

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

  getTrustedHTML(vidUrl)
  {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(vidUrl);
  }

  isLevelShown(index) 
  {
    return this.showLevel === index;
  };

  toggleLevel(index) 
  {
    if (this.isLevelShown(index)) 
    {
      this.showLevel = index;
    } 
    else 
    {
      this.showLevel = index;
    }
  };


}
