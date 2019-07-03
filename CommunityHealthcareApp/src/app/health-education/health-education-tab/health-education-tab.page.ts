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
  showLevel: null;
  title: string;
  secondTitle: string;


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
      this.title = this.firstTitle(this.loadedTab.title);
      this.secondTitle = this.loadedTab.title.replace(this.title, " ");
    });
  }

  firstTitle(word:string){
    let first = "";
   for(let i = 0; i < word.length; i++){
     if(word[i] != ' '){
       first += word[i];
     }
     else{
      break;
     }
   }
   return first;
  
  };
  
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
