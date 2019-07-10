import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-log',
  templateUrl: './health-log.page.html',
  styleUrls: ['./health-log.page.scss'],
})
export class HealthLogPage implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  private products = [
    {
      name: "Insulin Log",
      notes: "Take once daily"
    },
  
    {
      name: "Blood Pressure Log",
      notes: "Take BP Daily. Avoid taking after physical activity"
    },
  
    {
      name:"Blood Glucose Log",
      notes:"Take BG before and after each meal"
    },
  
    {
      name:"Water Intake Log",
      notes:"Hydrate after intense physical exercise"
    }
  ];
  

}
