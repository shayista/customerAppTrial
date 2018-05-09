import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { HttpModule } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicPageModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MyVisitPage } from '../pages/my-visit/my-visit';
import { loginPage } from '../pages/login/login';
import { rootModulePage } from '../pages/rootModule/rootModule';
import { DataServiceProvider } from '../providers/data-service';
import { NotificationService } from '../providers/notification';
import { notificationModulePage } from '../pages/notification/notification';
import { mainHeader } from '../pages/mainHeader/mainHeader';
import { commentPage } from '../pages/comments/comments';
import { sessionFeedbackPage } from '../pages/sessionFeedback/sessionFeedback';
import { changePasswordPage } from '../pages/changePasswordFirst/changePassword';
import { securityQuestionPage } from '../pages/securityQuestion/securityQuestion';
import { changePasswordProfilePage } from '../pages/changePassword/changePassword';
import { ForgotPasswordPage } from '../pages/forgotPassword/forgotPassword';
import { profileDetailsPage } from '../pages/profile/profileDetials';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MyVisitPage,
    loginPage,
    rootModulePage,
    notificationModulePage,
    mainHeader,
    commentPage,
    sessionFeedbackPage,
    changePasswordPage,
    securityQuestionPage,
    changePasswordProfilePage,
    ForgotPasswordPage,
    profileDetailsPage
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(mainHeader),
    HttpClientModule,
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MyVisitPage,
    loginPage,
    rootModulePage,
    notificationModulePage,
    mainHeader,
    commentPage,
    sessionFeedbackPage,
    changePasswordPage,
    securityQuestionPage,
    changePasswordProfilePage,
    ForgotPasswordPage,
    profileDetailsPage
      ],
  providers: [
    StatusBar,
    SplashScreen,
    DataServiceProvider,
    NotificationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
