import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConditionsService } from './conditions.service';
import { Condition } from './conditions.model';
import { ModalController, LoadingController } from '@ionic/angular';
import { AddConditionComponent } from './add-condition/add-condition.component';
import { EditConditionComponent } from './edit-condition/edit-condition.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.page.html',
  styleUrls: ['./conditions.page.scss']
})
export class ConditionsPage implements OnInit, OnDestroy {
  loadedConditions: Condition[];
  private loadedConditionsSub: Subscription;
  public deleteButtonText = 'delete';
  public editButtonText = 'edit';
  public canDelete = false;
  public canEdit = false;

  constructor(
    private conditionsService: ConditionsService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter() {
    this.conditionsService.fetchInformation().subscribe();
  }

  ngOnInit() {
    this.loadedConditionsSub = this.conditionsService.conditions.subscribe(
      condition => {
        this.loadedConditions = condition;
      }
    );
  }

  ngOnDestroy() {
    if (this.loadedConditionsSub) {
      this.loadedConditionsSub.unsubscribe();
    }
  }

  getItem(condition_id: number) {
    return this.loadedConditions.filter(x => x.id === condition_id)[0];
  }

  onEditItem(condition_id: number) {
    this.modalCtrl
      .create({
        component: EditConditionComponent,
        componentProps: {
          id: condition_id,
          condition_name: this.getItem(condition_id).condition_name,
          condition_notes: this.getItem(condition_id).condition_notes
        }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      });
  }

  onAddCondition() {
    this.canEdit = false;
    this.deleteButtonText = 'delete';
    this.editButtonText = 'edit';
    this.canEdit = false;
    this.canDelete = false;
    this.modalCtrl
      .create({ component: AddConditionComponent })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      });
  }

  delete(id: number) {
    this.loadingCtrl
      .create({
        message: 'Updating...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.conditionsService.deleteCondition(id).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }

  onDeleteCondition() {
    this.editButtonText = 'edit';
    this.canEdit = false;
    this.canDelete = !this.canDelete;
    if (this.deleteButtonText === 'delete') {
      this.deleteButtonText = 'done';
    } else {
      this.deleteButtonText = 'delete';
    }
  }

  onEditCondition() {
    this.deleteButtonText = 'delete';
    this.canDelete = false;
    this.canEdit = !this.canEdit;
    if (this.editButtonText === 'edit') {
      this.editButtonText = 'done';
    } else {
      this.editButtonText = 'edit';
    }
  }
}
