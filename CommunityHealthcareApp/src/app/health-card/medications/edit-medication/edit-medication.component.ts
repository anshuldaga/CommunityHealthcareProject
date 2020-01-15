import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { MedicationsService } from '../medications.service';

@Component({
  selector: 'app-edit-medication',
  templateUrl: './edit-medication.component.html',
  styleUrls: ['./edit-medication.component.scss']
})
export class EditMedicationComponent implements OnInit {
  id;
  medication_name;
  medication_notes;
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
          .editMedication(
            this.id,
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
