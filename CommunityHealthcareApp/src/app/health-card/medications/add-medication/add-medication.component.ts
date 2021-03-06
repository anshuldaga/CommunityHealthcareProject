import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { MedicationsService } from '../medications.service';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.scss']
})
export class AddMedicationComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  constructor(
    private modalCtrl: ModalController,
    private medicationsService: MedicationsService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onMedicationEntered() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.medicationsService
          .addMedication(
            this.form.value['medication'],
            this.form.value['notes']
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.modalCtrl.dismiss('confirm');
          });
      });
  }
}
