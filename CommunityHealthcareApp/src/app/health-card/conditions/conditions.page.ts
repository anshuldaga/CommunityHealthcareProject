import { Component, OnInit } from '@angular/core';
import {ConditionsService} from './conditions.service'
import {Condition} from './conditions.model';
import { ModalController } from '@ionic/angular';
import { AddConditionComponent } from './add-condition/add-condition.component';


@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.page.html',
  styleUrls: ['./conditions.page.scss'],
})

export class ConditionsPage implements OnInit {

  loadedConditions: Condition[]; 

  constructor(private conditionsService: ConditionsService,
    private modalCtrl: ModalController) 
  {
      this.loadedConditions = this.conditionsService.getConditions();
  }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    console.log("HELLO");
  }
  
  onAddCondition()
  {
      this.modalCtrl
      .create({component: AddConditionComponent})
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      });
  }

}
