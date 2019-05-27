import { Injectable } from '@angular/core';
import { EducationTab } from './health-education.model';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class HealthEducationService 
{
  private healthEducationTabs: EducationTab[] = 
  [
    {
      id: 'v1',
      title: 'Video One', 
      videoUrl: this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/6kqe2ICmTxc'),
      description: 'description lorem ipsum',

    },
    {
      id: 'v2',
      title: 'Video Two', 
      videoUrl: this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/6kqe2ICmTxc'),
      description: 'description lorem ipsum',
    },
    {
      id: 'v3',
      title: 'Video Three', 
      videoUrl: this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/6kqe2ICmTxc'),
      description: 'description lorem ipsum'
    }
  ];


  constructor(private domSanitizer: DomSanitizer){ }

  getAllEducationTabs()
  {
      return [...this.healthEducationTabs];
  }

  getEducationTab(educationTabId: string)
  {
    return{
      ...this.healthEducationTabs.find(educationTab =>{
        return educationTab.id === educationTabId;
      })
    };
  }

}
