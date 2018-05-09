import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { DataServiceProvider } from '../../providers/data-service';
import { mainHeader } from '../mainHeader/mainHeader';



@Component({
  selector: 'page-profileDetails',
  templateUrl: 'profileDetials.html'
})
export class profileDetailsPage {
attendeeId:any;

  constructor( public navParams: NavParams,public viewCtrl: ViewController , public navCtrl: NavController, private _dataservice :DataServiceProvider) {
//  this.username=this.navParams.get("username");
this.attendeeId   = sessionStorage.getItem("attendeeId");
 console.log('uid',this.attendeeId);
  }
 
  goBack(){
    this.navCtrl.pop();
  }

}

