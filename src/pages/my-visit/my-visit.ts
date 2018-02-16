import { Component } from '@angular/core';
import {  NavController, NavParams ,PopoverController } from 'ionic-angular';
import { rootModulePage } from '../rootModule/rootModule';



@Component({
  selector: 'page-my-visit',
  templateUrl: 'my-visit.html',
})
export class MyVisitPage {



  constructor(public navCtrl: NavController, public navParams: NavParams , public popoverCtrl: PopoverController) {
   
  }

  goBack() {
    this.navCtrl.pop();
   
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(rootModulePage);
    popover.present({
      ev: myEvent
    });
  }
  toggleColor(){
    
    let segment=
    document.getElementById('agendaContent').classList;
    
    var valueItineary=
    document.getElementById('itineary').innerHTML;
    
    if(valueItineary)
    
    {
    
    segment.remove("agenda");
    
    }
    
    }
    

}
