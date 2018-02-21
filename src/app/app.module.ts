import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { HttpModule } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MyVisitPage } from '../pages/my-visit/my-visit';
import { loginPage } from '../pages/login/login';
import { rootModulePage } from '../pages/rootModule/rootModule'
import { DataServiceProvider } from '../providers/data-service'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MyVisitPage,
    loginPage,
    rootModulePage
   
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    HttpClientModule,
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MyVisitPage,
    loginPage,
    rootModulePage
      ],
  providers: [
    StatusBar,
    SplashScreen,
    DataServiceProvider,
      
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
