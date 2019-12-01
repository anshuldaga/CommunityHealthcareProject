import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HealthResourcesTabPage } from './health-resources-tab.page';

const routes: Routes = [
  {
    path: '',
    component: HealthResourcesTabPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HealthResourcesTabPage]
})
export class HealthResourcesTabPageModule {}
