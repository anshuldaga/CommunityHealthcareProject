import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicationsService } from './medications.service';
import { Medication } from './medications.model';
import { ModalController, LoadingController } from '@ionic/angular';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { EditMedicationComponent } from './edit-medication/edit-medication.component';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.page.html',
  styleUrls: ['./medications.page.scss']
})
export class MedicationsPage implements OnInit, OnDestroy {
  public deleteButtonText = 'delete';
  public editButtonText = 'edit';
  public canEdit = false;
  public canDelete = false;
  loadedMedications: Medication[];
  private loadedMedicationsSub: Subscription;

  constructor(
    private medicationsService: MedicationsService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter() {
    this.medicationsService.fetchMedication().subscribe();
  }

  ngOnInit() {
    this.loadedMedicationsSub = this.medicationsService.medications.subscribe(
      medication => {
        this.loadedMedications = medication;
      }
    );
  }

  ngOnDestroy() {
    if (this.loadedMedicationsSub) {
      this.loadedMedicationsSub.unsubscribe();
    }
  }

  onAddMedication() {
    this.canEdit = false;
    this.deleteButtonText = 'delete';
    this.editButtonText = 'edit';
    this.canEdit = false;
    this.canDelete = false;
    this.modalCtrl
      .create({ component: AddMedicationComponent })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      });
  }

  getItem(med_id: number) {
    return this.loadedMedications.filter(x => x.id === med_id)[0];
  }

  onEditItem(med_id: number) {
    this.modalCtrl
      .create({
        component: EditMedicationComponent,
        componentProps: {
          id: med_id,
          medication_name: this.getItem(med_id).medication_name,
          medication_notes: this.getItem(med_id).medication_notes
        }
      })
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
        this.medicationsService.deleteMedication(id).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }

  onDeleteMedication() {
    this.editButtonText = 'edit';
    this.canEdit = false;
    this.canDelete = !this.canDelete;
    if (this.deleteButtonText === 'delete') {
      this.deleteButtonText = 'done';
    } else {
      this.deleteButtonText = 'delete';
    }
  }

  onEditMedication() {
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
