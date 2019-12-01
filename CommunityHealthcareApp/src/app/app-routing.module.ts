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

  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },

  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },

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
    path: 'health-resources', 
    children: 
    [
      {
        path: '',
        loadChildren: './health-resources/health-resources.module#HealthResourcesPageModule'
      },
      {
        path: ':resourceTabId',
        loadChildren: './health-resources/health-resources-tab/health-resources-tab.module#HealthResourcesTabPageModule' 
      }
    ]
  },
  { path: 'health-calendar', loadChildren: './health-calendar/health-calendar.module#HealthCalendarPageModule' },
  { path: 'tabs', loadChildren: './health-card/tabs/tabs.module#TabsPageModule' },
  { path: 'edit-information', loadChildren: './health-card/information/edit-information/edit-information.module#EditInformationPageModule' },
  { path: 'logtabs', loadChildren: './health-logs/tabs/tabs.module#TabsPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
