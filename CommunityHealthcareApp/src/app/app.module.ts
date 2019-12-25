import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeService } from './service/employee.service';
import { RegisterService } from './service/register.service';
import { LoginService } from './service/login.service'
import { AuthGuard } from '../auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpModule, HttpClientModule, NgCalendarModule], //, IonicStorageModule.forRoot()
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EmployeeService,
    RegisterService,
    LoginService,
    { 
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}