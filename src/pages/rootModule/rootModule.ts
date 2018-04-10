import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { loginPage } from '../login/login';

@Component({
  selector: 'page-rootModule',
  templateUrl: 'rootModule.html'
})
export class rootModulePage {
  
  attendeeName:String;
  
  constructor(public viewCtrl: ViewController , public navCtrl: NavController ) {
    if (sessionStorage.getItem("attendeeId") == "undefined") {
      this.navCtrl.setRoot(loginPage);
      this.navCtrl.push(loginPage);
    } else {
      this.attendeeName = sessionStorage.getItem("attendeeName");
      //console.log(this.attendeeName);
    }
  }
  
    // close() {
    //   this.viewCtrl.dismiss();
    // }
    
    goBack() {
      this.viewCtrl.dismiss();
      this.navCtrl.setRoot(loginPage).then(() =>{
        this.navCtrl.popToRoot();
        window.location.reload();
      });
      //this.navCtrl.popToRoot();
    }    
}

