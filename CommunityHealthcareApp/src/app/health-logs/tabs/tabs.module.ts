import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'logtabs',
    component: TabsPage,
    children:[
      {
        path: 'logs',
        loadChildren: '../log/logs.module#LogsPageModule',
      },
      {
        path: 'medlogs',
        loadChildren: '../medlogs/medlogs.module#MedlogsPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'logtabs/logs',
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
