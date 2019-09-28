import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InformationPage } from './information.page';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

const routes: Routes = [
  {
    path: '',
    component: InformationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InformationPage]
})
export class InformationPageModule {}
