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
  { path: 'health-resources', loadChildren: './health-resources/health-resources.module#HealthResourcesPageModule' },
  { path: 'health-log', loadChildren: './health-log/health-log.module#HealthLogPageModule' },
  { path: 'health-card', loadChildren: './health-card/health-card.module#HealthCardPageModule' },
  { path: 'health-calendar', loadChildren: './health-calendar/health-calendar.module#HealthCalendarPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
