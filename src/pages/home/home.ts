import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { loginPage } from '../login/login';
import { MyVisitPage } from '../my-visit/my-visit';
import { PopoverController } from 'ionic-angular';
import { rootModulePage } from '../rootModule/rootModule';






@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Visits: any;
  constructor(public navCtrl: NavController , public popoverCtrl: PopoverController) {
    if (!sessionStorage.getItem("attendeeId")) {
        this.navCtrl.push(loginPage);
    }
  
  }

  
  goToOtherPage() { 
    this.navCtrl.push(MyVisitPage);
  
    }

    presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(rootModulePage);
      popover.present({
        ev: myEvent
      });
    }
   
    
}

