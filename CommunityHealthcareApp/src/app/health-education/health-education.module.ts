import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { IonicModule } from '@ionic/angular';

import { HealthEducationPage } from './health-education.page';

const routes: Routes = [
  {
    path: '',
    component: HealthEducationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HealthEducationPage]
})
export class HealthEducationPageModule {}
