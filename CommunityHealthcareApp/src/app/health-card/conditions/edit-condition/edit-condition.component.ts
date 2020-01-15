import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { ConditionsService } from '../conditions.service';

@Component({
  selector: 'app-edit-condition',
  templateUrl: './edit-condition.component.html',
  styleUrls: ['./edit-condition.component.scss']
})
export class EditConditionComponent implements OnInit {
  id;
  condition_name;
  condition_notes;
  @ViewChild('f') form: NgForm;

  constructor(
    private modalCtrl: ModalController,
    private conditionsService: ConditionsService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onConditionEntered() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.conditionsService
          .editCondition(
            this.id,
            this.form.value['condition'],
            this.form.value['notes']
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.modalCtrl.dismiss('confirm');
          });
      });
  }
}
