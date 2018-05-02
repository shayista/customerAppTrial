import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { DataServiceProvider } from '../../providers/data-service';
import { securityQuestionPage } from '../securityQuestion/securityQuestion';


@Component({
  selector: 'page-changePassword',
  templateUrl: 'changePassword.html'
})
export class changePasswordPage {
  attendeeId:any;
password: any;
reenterPassword: any;
  constructor( public navParams: NavParams,public viewCtrl: ViewController , public navCtrl: NavController, private _dataservice :DataServiceProvider) {
//  this.username=this.navParams.get("username");
this.attendeeId   = sessionStorage.getItem("attendeeId");
 console.log('uid',this.attendeeId);
  }
  goBack(){
    this.navCtrl.push(loginPage);
  }
 changePassword(){
   console.log(this.password);
   console.log(this.reenterPassword);
  
   if(this.password == this.reenterPassword){
   let userPasswordChange ={
    attendeeId : this.attendeeId,
    updatedPassword : this.password
   }
    this._dataservice.updatePassword(userPasswordChange)
    .subscribe(res => {
    res;
    
        },
    error => console.log(error)
    );
    this.navCtrl.push(securityQuestionPage);
   }
   else{
     alert("paswword doesnt match");
   }
  
 }
 skip(){
  this.navCtrl.push(securityQuestionPage);
}
}

