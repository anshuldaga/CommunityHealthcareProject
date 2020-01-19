import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConditionsPage } from './conditions.page';
import { AddConditionComponent } from './add-condition/add-condition.component';
import { EditConditionComponent } from './edit-condition/edit-condition.component';

const routes: Routes = [
  {
    path: '',
    component: ConditionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConditionsPage, AddConditionComponent, EditConditionComponent],
  entryComponents: [AddConditionComponent, EditConditionComponent]
})
export class ConditionsPageModule {}
