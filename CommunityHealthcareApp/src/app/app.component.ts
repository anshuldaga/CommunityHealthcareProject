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
      title: 'Health Resources',
      url: '/health-resources',
      icon: 'people'
    },
    {
      title: 'Health Education',
      url: '/health-education',
      icon: 'book'
    },
    {
      title: 'Health Calendar',
      url: '/health-calendar',
      icon: 'calendar'
    },
    {
      title: 'Health Card',
      url: '/health-card',
      icon: 'person'
    },
    {
      title: 'Health Log',
      url: '/health-log',
      icon: 'document'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
