import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { MyVisitPage } from '../my-visit/my-visit';
import { PopoverController } from 'ionic-angular';
import { rootModulePage } from '../rootModule/rootModule';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DataServiceProvider } from '../../providers/data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  futureVisits: any;
  pastVisits: any;
  constructor(public navCtrl: NavController , public popoverCtrl: PopoverController, private _dataservice: DataServiceProvider) {
    if (sessionStorage.getItem("attendeeId") == "undefined") {
        this.navCtrl.push(loginPage);
    }
  }

  ngOnInit() {
    //this.getCustlatestVisit();
    this.getCustPastVisit();
  }


  getCustlatestVisit() {
    this._dataservice.getCustFutureAndPastVisit(sessionStorage.getItem("attendeeId"), 1)
                      .subscribe(res=> 
                                    {
                                      this.futureVisits = res; console.log(JSON.stringify(this.futureVisits));
                                    },
                                error => console.log("Error :: " + error)  
                                );
}

getCustPastVisit() { 
  this._dataservice.getCustFutureAndPastVisit(sessionStorage.getItem("attendeeId"), 1)
                    .subscribe(res=> 
                                  {
                                    this.pastVisits = res; console.log(JSON.stringify(this.pastVisits));
                                  },
                               error => console.log("Error :: " + error)  
                              );
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

