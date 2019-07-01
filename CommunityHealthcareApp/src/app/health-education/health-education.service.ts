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
<<<<<<< HEAD
  
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

=======
>>>>>>> parent of 0754d1c... Merge branch 'Front_End_Development' into Release1

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
