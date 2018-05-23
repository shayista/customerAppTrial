import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { DataServiceProvider } from '../../providers/data-service';
import { securityQuestionPage } from '../securityQuestion/securityQuestion';


@Component({
  selector: 'page-sessionDetails',
  templateUrl: 'sessionDetails.html'
})
export class sessionDetailsPage {
  attendeeId:any;
  password: any;
  reenterPassword: any;
  constructor( public navParams: NavParams,public viewCtrl: ViewController , public navCtrl: NavController, private _dataservice :DataServiceProvider) {
//  this.username=this.navParams.get("username");
this.attendeeId   = sessionStorage.getItem("attendeeId");
 console.log('uid',this.attendeeId);
  }
  goBack(){
      this.navCtrl.pop();
  }

}

