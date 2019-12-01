import { Injectable } from '@angular/core';
import { ResourcesTab, pageInfoSection } from './health-resources.model';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class HealthResourcesService 
{
  private tab1Info: pageInfoSection[] =
  [
    {
      infoTitle: 'Alachua Habitat For Humanity',
      infoDescription: 'iPhone users have a hard time switching over to Android because they\'re integrated into Apple\'s ecosystem. Apple\'s software, products, and accessories keep users locked in. However, Google is making the switch to Android a little easier.',
      infoDetails: [
      {
      infoName: 'Address',
      info: '2630 NW 41st Street, C-3, Gainesville'
      },
      {
      infoName: "Phone",
      info: '(362) 378-4663'
      },
      {
      infoName: 'Days Open',
      info: "M,T,W,R,F"
      },
      {
      infoName: 'Hours',
      info: "9:00am - 5:00pm"
      },
      {
      infoName: 'Requirements',
      info: "Must be living in substantial housing, must meet income requirements"
      },
      {
      infoName: 'Bus Routes',
      info: 43
      },
      {
      infoName: 'Cost',
      info: "Varies"
      },
      {
      infoName: "Translation Ability",
      info: "None"
      }
    ]
    },
    {
      infoTitle: 'USDA Rural Development',
      infoDescription: 'iPhone users have a hard time switching over to Android because they\'re integrated into Apple\'s ecosystem. Apple\'s software, products, and accessories keep users locked in. However, Google is making the switch to Android a little easier.',
      infoDetails: [
      {
      infoName: 'Address',
      info: '2630 NW 41st Street, C-3, Gainesville'
      },
      {
      infoName: "Phone",
      info: '(362) 378-4663'
      },
      {
      infoName: 'Days Open',
      info: "M,T,W,R,F"
      },
      {
      infoName: 'Hours',
      info: "9:00am - 5:00pm"
      },
      {
      infoName: 'Requirements',
      info: "Must be living in substantial housing, must meet income requirements"
      },
      {
      infoName: 'Bus Routes',
      info: 43
      },
      {
      infoName: 'Cost',
      info: "Varies"
      },
      {
      infoName: "Translation Ability",
      info: "None"
      }
    ]
    },
    {
      infoTitle: 'St.Francis House',
      infoDescription: 'iPhone users have a hard time switching over to Android because they\'re integrated into Apple\'s ecosystem. Apple\'s software, products, and accessories keep users locked in. However, Google is making the switch to Android a little easier.',
      infoDetails: [
      {
      infoName: 'Address',
      info: '2630 NW 41st Street, C-3, Gainesville'
      },
      {
      infoName: "Phone",
      info: '(362) 378-4663'
      },
      {
      infoName: 'Days Open',
      info: "M,T,W,R,F"
      },
      {
      infoName: 'Hours',
      info: "9:00am - 5:00pm"
      },
      {
      infoName: 'Requirements',
      info: "Must be living in substantial housing, must meet income requirements"
      },
      {
      infoName: 'Bus Routes',
      info: 43
      },
      {
      infoName: 'Cost',
      info: "Varies"
      },
      {
      infoName: "Translation Ability",
      info: "None"
      }
    ]
  },
  {
    infoTitle: 'Peaceful Paths Domestic Abuse Network',
    infoDescription: 'iPhone users have a hard time switching over to Android because they\'re integrated into Apple\'s ecosystem. Apple\'s software, products, and accessories keep users locked in. However, Google is making the switch to Android a little easier.',
    infoDetails: [
    {
    infoName: 'Address',
    info: '2630 NW 41st Street, C-3, Gainesville'
    },
    {
    infoName: "Phone",
    info: '(362) 378-4663'
    },
    {
    infoName: 'Days Open',
    info: "M,T,W,R,F"
    },
    {
    infoName: 'Hours',
    info: "9:00am - 5:00pm"
    },
    {
    infoName: 'Requirements',
    info: "Must be living in substantial housing, must meet income requirements"
    },
    {
    infoName: 'Bus Routes',
    info: 43
    },
    {
    infoName: 'Cost',
    info: "Varies"
    },
    {
    infoName: "Translation Ability",
    info: "None"
    }
  ]
}
]
  
  private healthResourcesTabs: ResourcesTab[] = 
  [
    {
      id: 'Access',
      id2: '',
      pic: 'heart',
      testBhar: this.tab1Info
    },
    {
      id: 'General Health',
      id2: '',
      pic: 'heart',
      testBhar: this.tab1Info
    },
    {
      id: 'Hospitals & Clinics',
      id2: '',
      pic: 'medkit',
      testBhar: this.tab1Info
    },
    {
      id: 'Education',
      id2: '',
      pic: 'book',
      testBhar: this.tab1Info
    },
    {
      id: 'Food & Security',
      id2: '',
      pic: 'pizza',
      testBhar: this.tab1Info 
    },
    {
      id: 'Women, Children',
      id2: '& Elders',
      pic: 'people',
      testBhar: this.tab1Info
    }
  ];


  constructor(private domSanitizer: DomSanitizer){ }

  getAllEducationTabs()
  {
      return [...this.healthResourcesTabs];
  }

  getResourceTab(resourceTabId: string)
  {
    return{
      ...this.healthResourcesTabs.find(resourceTab =>{
        return resourceTab.id === resourceTabId;
      })
    };
  }

}
