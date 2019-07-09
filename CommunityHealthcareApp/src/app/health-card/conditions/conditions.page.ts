import { Component, OnInit, OnDestroy } from '@angular/core';
import {ConditionsService} from './conditions.service'
import {Condition} from './conditions.model';
import { ModalController, LoadingController } from '@ionic/angular';
import { AddConditionComponent } from './add-condition/add-condition.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.page.html',
  styleUrls: ['./conditions.page.scss'],
})

export class ConditionsPage implements OnInit, OnDestroy {

  loadedConditions: Condition[]; 
  private loadedConditionsSub: Subscription;
  public buttonText = 'Delete';
  public canDelete: boolean = false;

  constructor(private conditionsService: ConditionsService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController) 
  {
  }

  ngOnInit() 
  {
    this.loadedConditionsSub = this.conditionsService.conditions.subscribe(condition => {
      this.loadedConditions= condition;
    });
  }

  ngOnDestroy()
  {
    if(this.loadedConditionsSub)
    {
        this.loadedConditionsSub.unsubscribe();
    }
  }

  onAddCondition()
  {
    this.canDelete = false;
    this.buttonText = 'Delete';
      this.modalCtrl
      .create({component: AddConditionComponent})
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      });
  }

  delete(id: string)
  {
    this.loadingCtrl.create({
      message: 'Updating...'
    }).then(loadingEl => {
      loadingEl.present();
    this.conditionsService.deleteCondition(id).subscribe(() => {
      loadingEl.dismiss();
    });
  });
  }

  onDeleteCondition()
  {
    this.canDelete = !this.canDelete;
    if(this.buttonText === "Delete")
        this.buttonText = "Done";
    else
      this.buttonText = "Delete";
  }

}
