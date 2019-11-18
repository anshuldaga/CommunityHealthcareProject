import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LogsService } from '../logs.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  tempEvent;
  evProperty;

  constructor(
    private modalCtrl: ModalController,
    private logsService: LogsService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onValueEntered() {
    if (!this.form.valid) {
      return;
    }

    if (this.evProperty == 'isInsulin') {
      this.tempEvent.insulinValue = this.form.value.val;
    } else if (this.evProperty == 'isBP') {
      this.tempEvent.BPValue = this.form.value.val;
    } else if (this.evProperty == 'isBG') {
      this.tempEvent.BGValue = this.form.value.val;
    }

    this.loadingCtrl
      .create({
        message: 'Updating...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.logsService.update(this.tempEvent).subscribe(() => {
          console.log('update');
          loadingEl.dismiss();
          this.modalCtrl.dismiss(
            {
              evData: {
                eventCopy: this.tempEvent
              }
            },
            'confirm'
          );
        });
      });
  }
}
