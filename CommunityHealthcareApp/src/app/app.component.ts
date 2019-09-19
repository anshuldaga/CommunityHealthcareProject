import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {

      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Health Calendar',
      url: '/health-calendar',
      icon: 'calendar'
    },
    {
      title: 'Health Card',
      url: '/tabs',
      icon: 'person'
    },
    {
      title: 'Health Education',
      url: '/health-education',
      icon: 'book'
    },
    {
      title: 'Health Log',
      url: '/logtabs',
      icon: 'document'
    },
    {
      title: 'Health Resources',
      url: '/health-resources',
      icon: 'people'

    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }


  ngOnInit() {
   // this.router.navigate([''])
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
