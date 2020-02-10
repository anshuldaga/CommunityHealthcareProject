import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },

  {
    path: 'health-education',
    children: [
      {
        path: '',
        loadChildren:
          './health-education/health-education.module#HealthEducationPageModule'
      },
      {
        path: ':educationTabId',
        loadChildren:
          './health-education/health-education-tab/health-education-tab.module#HealthEducationTabPageModule'
      }
    ]
  },
  {
    path: 'health-calendar',
    loadChildren:
      './health-calendar/health-calendar.module#HealthCalendarPageModule'
  },
  {
    path: 'tabs',
    loadChildren: './health-card/tabs/tabs.module#TabsPageModule'
  },
  // tslint:disable-next-line: max-line-length
  {
    path: 'edit-information',
    loadChildren:
      './health-card/information/edit-information/edit-information.module#EditInformationPageModule'
  },
  {
    path: 'logtabs',
    loadChildren: './health-logs/tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterPageModule'
  },
  {
    path: 'add-appointment',
    loadChildren:
      './health-calendar/add-appointment/add-appointment.module#AddAppointmentPageModule'
  },  { path: 'health-resources', loadChildren: './health-resources/health-resources.module#HealthResourcesPageModule' },
  { path: 'all-resources', loadChildren: './health-resources/all-resources/all-resources.module#AllResourcesPageModule' },
  { path: 'all-details', loadChildren: './health-resources/all-resources/all-details/all-details.module#AllDetailsPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
