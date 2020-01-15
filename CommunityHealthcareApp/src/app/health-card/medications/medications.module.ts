import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MedicationsPage } from './medications.page';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { EditMedicationComponent } from './edit-medication/edit-medication.component';

const routes: Routes = [
  {
    path: '',
    component: MedicationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MedicationsPage,
    AddMedicationComponent,
    EditMedicationComponent
  ],
  entryComponents: [AddMedicationComponent, EditMedicationComponent]
})
export class MedicationsPageModule {}
