import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HealthEducationTabPage } from './health-education-tab.page';

const routes: Routes = [
  {
    path: '',
    component: HealthEducationTabPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HealthEducationTabPage]
})
export class HealthEducationTabPageModule {}
