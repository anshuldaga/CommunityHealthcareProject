import { Component, OnInit, OnDestroy } from '@angular/core';
import {MedicationsService} from './medications.service'
import {Medication} from './medications.model';
import { ModalController, LoadingController } from '@ionic/angular';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.page.html',
  styleUrls: ['./medications.page.scss'],
})
export class MedicationsPage implements OnInit, OnDestroy 
{
  public buttonText = 'Delete';
  public canDelete: boolean = false;
  loadedMedications: Medication[]; 
  private loadedMedicationsSub: Subscription;

  constructor(private medicationsService: MedicationsService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController) {}

  ionViewWillEnter() {
    this.medicationsService.fetchMedication().subscribe();
  }    

  ngOnInit() 
  {
    this.loadedMedicationsSub = this.medicationsService.medications.subscribe(medication => {
      this.loadedMedications = medication;
    });
  }

  ngOnDestroy()
  {
    if(this.loadedMedicationsSub)
    {
        this.loadedMedicationsSub.unsubscribe();
    }
  }
  
  onAddMedication()
  {
    this.canDelete = false;
    this.buttonText = 'Delete';
      this.modalCtrl
      .create({component: AddMedicationComponent})
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      });
  }

  delete(id: number)
  {
    this.loadingCtrl.create({
      message: 'Updating...'
    }).then(loadingEl => {
      loadingEl.present();
    this.medicationsService.deleteMedication(id).subscribe(() => {
      loadingEl.dismiss();
    });
  });
  }

  onDeleteMedication()
  {
    this.canDelete = !this.canDelete;
    if(this.buttonText === "Delete")
    {
        this.buttonText = "Done";
    }
    else
    {
      this.buttonText = "Delete";
    }
  }

}
