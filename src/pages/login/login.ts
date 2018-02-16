import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage {

  constructor(public navCtrl: NavController) {
  }
  
  goToOtherPage() { 
    this.navCtrl.push(HomePage);
  
    }
}
