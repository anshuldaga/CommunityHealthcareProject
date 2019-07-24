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
  bold1 = "bold";
  bold2 = "";
  bold3 = "";
  information = true;
  medications = false;
  conditions = false;
  healthCareProviders = ["United Health", "Delta Dental"];
allergies = ["Milk", "Gluten", "Nuts"];
  
   constructor() { }

  ngOnInit() {
   
  }

bolding1() {
  this.bold1 = "bold";
  this.bold2 = "";
  this.bold3 = "";
  this.information = true;
  this.medications = false;
  this.conditions = false;

};
bolding2() {
  this.bold1 = "";
  this.bold2 = "bold";
  this.bold3 = "";
  this.information = false;
  this.medications = true;
  this.conditions = false;
};
bolding3() {
  this.bold1 = "";
  this.bold2 = "";
  this.bold3 = "bold";
  this.information = false;
  this.medications = false;
  this.conditions = true;
};

private theMedications = [
  {
    name: "Hypertension", 
    names: [
    {
      title: "Lisonopril",
      dosage: "200 mg/day",
      description: "Take after eating"
    },
    {
      title: "Valsartan",
      dosage: "150 mg every 2 days",
      description: "Take before bed"
    }
  ]
 },

   {
    name: "Migrane",
    names: [
      {
        title: "Topiramate",
        dosage: "100 mg/day",
        description: "Take after eating"
      },
    ]
  }
];

private theConditions = [
  {
    name : "Hypertension",
    notes : "Have had hypertension for 8 years,Treated with Lisinopril and Valsartan.Sometimes fluctuates above 150/90,but usually stays around 140/90."
  }

];



}
