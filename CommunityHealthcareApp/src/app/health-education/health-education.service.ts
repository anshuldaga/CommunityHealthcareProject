import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HealthEducationService 
{
    private healthEducationTabs: any;


  constructor(public http: HttpClient)
  {
    this.loadData();
  }

  private tabThreeVids: pageVideoSection[] =
  [
    {
      videoTitle: 'Bill Gates on who should use your data',
      videoDescription: 'Bill Gates on how we should use data and when to worry about privacy. Gates believes there is an upside to making your data public. Gates was interviewed by Quartz in 2019.',
      videoUrl: this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/tQhOtHJWo8A')
    },
    {
      videoTitle: 'How Bill Gates remembers what he reads',
      videoDescription: 'Bill Gates is a voracious reader. In conversation with him, i\'s striking how frequently he cites things he\'s read. So he doesn\'t just read a lot of books, but he remembers what he reads as well.',
      videoUrl: this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/8xwh88cI_d8')
    },
    {
      videoTitle: 'Farms under the sea could feed the world in 2050',
      videoDescription: 'Agriculture may not be able to feed the extra 2 billion people that are estimated to inhabit Earth by 2050.',
      videoUrl: this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/Pm58yVMT3MY')
    }
  ]
  
  private healthEducationTabs: EducationTab[] = 
  [
    {
      id: 'Managing your Health',
      title: 'Managing your Health', 
      description1: 'Understanding Diabetes,',
      description2: 'Managing High BP,', 
      description3: 'What is HIV/AIDS ?',
      image: "https://image.flaticon.com/icons/svg/838/838597.svg",
      testRach: this.tabOneVids
    },
    {
      id: 'Healthcare Finances',
      title: 'Healthcare Finances', 
      description1: 'How to enroll in forms of insurance,', 
      description2: 'Breaking down your health insurance',
      description3: '',
      image: "https://image.flaticon.com/icons/svg/755/755195.svg",
      testRach: this.tabTwoVids
    },
    {
      id: 'Mental Health',
      title: 'Mental Health', 
      description1: 'Depression,',
      description2: 'Managing Anxiety,',
      description3: 'Substance Use and Mental Health',
      image: "https://image.flaticon.com/icons/svg/1835/1835884.svg",
      testRach: this.tabThreeVids
    },
  ];


  loadData()
  {
    let data:Observable<any>;
    data = this.http.get('assets/information.json');
    data.subscribe(result => {
        this.healthEducationTabs = result;
      })
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
