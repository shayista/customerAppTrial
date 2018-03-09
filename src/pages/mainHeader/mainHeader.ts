import { Component } from '@angular/core';
import { NavController, ViewController, App } from 'ionic-angular';
import { loginPage } from '../login/login';
import { MyVisitPage } from '../my-visit/my-visit';
import { PopoverController } from 'ionic-angular';
import { rootModulePage } from '../rootModule/rootModule';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DataServiceProvider } from '../../providers/data-service';
import { notificationModulePage } from '../notification/notification';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-mainHeader',
  templateUrl: 'mainHeader.html'
})
export class mainHeader implements OnInit{
    tab1:any = HomePage;
    tab2:any = notificationModulePage;
  constructor(public navCtrl: NavController , public popoverCtrl: PopoverController, public viewCtrl: ViewController,
    public appCtrl: App) {

  }

  ngOnInit() {    
   
  }
 
      presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(rootModulePage);
        popover.present({
          ev: myEvent
        });
      }
      notificationPopover() {
        // this.viewCtrl.dismiss();
    
        this.appCtrl.getRootNav().push(notificationModulePage);
      }
      goBack(){
        this.navCtrl.push(mainHeader);
      }
}

