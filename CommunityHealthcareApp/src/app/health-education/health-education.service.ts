import { Injectable } from '@angular/core';
import { EducationTab, pageVideoSection } from './health-education.model';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class HealthEducationService 
{
  private tabOneVids: pageVideoSection[] =
  [
    {
      videoTitle: 'Why Is It So Hard To Switch From Apple to Android?',
      videoDescription: 'iPhone users have a hard time switching over to Android because they\'re integrated into Apple\'s ecosystem. Apple\'s software, products, and accessories keep users locked in. However, Google is making the switch to Android a little easier.',
      videoUrl: this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/vyElbR6BzZ8')
    },
    {
      videoTitle: '23 iPhone Tricks To Make Your Life Easier',
      videoDescription: 'The iPhone can do a lot of things, but many of its best features are buried in various menus you may not even know about. From perfect overhead shots to a hidden dark mode, here are some of our favorite iPhone tricks.',
      videoUrl: this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/U52mI00gmPU')
    }
  ]

  private tabTwoVids: pageVideoSection[] =
  [
    {
      videoTitle: 'There Are Gravity Pulses Hiding in the Universe’s Most MASSIVE Stars',
      videoDescription: 'Blue supergiant stars some of the hottest, biggest young stars in the universe, and their molten cores can reveal more about the formation of everything.',
      videoUrl: this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/wI-vP1_JnNM')
    }
  ]

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
