import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { loginPage } from '../pages/login/login';
import { MyVisitPage } from '../pages/my-visit/my-visit';
import { HomePage } from '../pages/home/home';
import { commentPage } from '../pages/comments/comments';


@Component({
  selector:'app-component',
  templateUrl: 'app.html'
})
export class MyApp {
 rootPage:any = commentPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

