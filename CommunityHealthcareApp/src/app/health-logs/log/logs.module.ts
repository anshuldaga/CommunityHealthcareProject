import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LogsPage } from './logs.page';
import { NgCalendarModule} from 'ionic2-calendar'

import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: LogsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCalendarModule
  ],
  declarations: [LogsPage, EditComponent],
  entryComponents: [EditComponent]
})
export class LogsPageModule {}
