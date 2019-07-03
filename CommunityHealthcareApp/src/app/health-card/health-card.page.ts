import { Component, OnInit } from '@angular/core';
import { doesNotReject } from 'assert';

@Component({
  selector: 'app-health-card',
  templateUrl: './health-card.page.html',
  styleUrls: ['./health-card.page.scss'],
})
export class HealthCardPage implements OnInit {
   name = "Jane Doe";
  firstInitial = this.name[0];
  secondInitial = this.name[(this.name.indexOf(" ")) + 1];
  weight = 120;
  height = "5\' 8\"";
  blood = "A+";
  
   constructor() { }

  ngOnInit() {
   
  }

  


}
