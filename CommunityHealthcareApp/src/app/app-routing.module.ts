import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { 
    path: 'health-education', 
    children: 
    [
      {
        path: '',
        loadChildren: './health-education/health-education.module#HealthEducationPageModule'
      },
      {
        path: ':educationTabId',
        loadChildren: './health-education/health-education-tab/health-education-tab.module#HealthEducationTabPageModule' 
      }
    ]
  },
  { 
    path: 'health-log', 
    children: 
    [
      {
        path: '',
        loadChildren: './health-log/health-log.module#HealthLogPageModule' 
      },
      {
        path: 'insulin-log',
        loadChildren: './health-log/details/details.module#DetailsPageModule' 
      },
      {
        path: 'bloodpressure-log',
        loadChildren: './health-log/details/details.module#DetailsPageModule' 
      },
      {
        path: 'bloodglucose-log',
        loadChildren: './health-log/details/details.module#DetailsPageModule' 
      },
      {
        path: 'medication-log',
        loadChildren: './health-log/medication-details/medication-details.module#MedicationDetailsPageModule' 
      }
    ]
  },
  { path: 'health-resources', loadChildren: './health-resources/health-resources.module#HealthResourcesPageModule' },
  { path: 'health-calendar', loadChildren: './health-calendar/health-calendar.module#HealthCalendarPageModule' },
  { path: 'tabs', loadChildren: './health-card/tabs/tabs.module#TabsPageModule' },
  { path: 'edit-information', loadChildren: './health-card/information/edit-information/edit-information.module#EditInformationPageModule' }
  //{ path: 'details', loadChildren: './health-log/details/details.module#DetailsPageModule' },
  //{ path: 'medication-details', loadChildren: './health-log/medication-details/medication-details.module#MedicationDetailsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
