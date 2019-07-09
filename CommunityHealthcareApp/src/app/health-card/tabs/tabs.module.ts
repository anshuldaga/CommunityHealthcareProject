import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
      {
        path: 'information',
        loadChildren: '../information/information.module#InformationPageModule'
      },
      {
        path: 'medications',
        loadChildren: '../medications/medications.module#MedicationsPageModule'
      },
      {
        path: 'conditions',
        loadChildren: '../conditions/conditions.module#ConditionsPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/information',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
