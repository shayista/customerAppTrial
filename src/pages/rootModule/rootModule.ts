import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { loginPage } from '../login/login';

@Component({
  selector: 'page-rootModule',
  templateUrl: 'rootModule.html'
})
export class rootModulePage {
 
  
  constructor(public viewCtrl: ViewController , public navCtrl: NavController ) {}
  
    // close() {
    //   this.viewCtrl.dismiss();
    // }
    
    goBack() {
      this.viewCtrl.dismiss();
      this.navCtrl.push(loginPage);
    }    
}

