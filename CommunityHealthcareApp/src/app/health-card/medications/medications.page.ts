import { Component, OnInit } from '@angular/core';
import {MedicationsService} from './medications.service'
import {Medication} from './medications.model';
import { ModalController } from '@ionic/angular';
import { AddMedicationComponent } from './add-medication/add-medication.component';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.page.html',
  styleUrls: ['./medications.page.scss'],
})
export class MedicationsPage implements OnInit 
{
  loadedMedications: Medication[]; 

  constructor(private medicationsService: MedicationsService,
    private modalCtrl: ModalController) 
  {
      this.loadedMedications = this.medicationsService.getMedications();
  }

  ngOnInit() {
  }
  
  onAddMedication()
  {
      this.modalCtrl
      .create({component: AddMedicationComponent})
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      });
  }

}
