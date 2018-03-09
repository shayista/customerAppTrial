import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { loginPage } from '../login/login';

import { NotificationService } from '../../providers/notification';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-notificationModule',
  templateUrl: 'notification.html'
})
export class notificationModulePage {
  attendeeId:string;
  notifications: any;
  
  constructor(public viewCtrl: ViewController , public navCtrl: NavController, private _notificationService: NotificationService ) {
    if (sessionStorage.getItem("attendeeId") == "undefined") {
        this.navCtrl.push(loginPage);
    } else {
      this.attendeeId   = sessionStorage.getItem("attendeeId");
    }
  }
  
  ngOnInit() {
    this.getCustomerNotifications();
    //this.notificationRead();//don't use this
  }
  
  
  close() {
    this.viewCtrl.dismiss();
  }
    
  goBack() {
   this.viewCtrl.dismiss();
    // this.navCtrl.push(HomePage);
  }
    
  getCustomerNotifications() { //console.log(this.attendeeId+"---this.attendeeId");
    this._notificationService.getCustomerNotifications(this.attendeeId)
                      .subscribe(res=>
                                {
                                  this.notifications= res.data.notifications; 
                                  //console.log(JSON.stringify(this.notifications) + "notification"); 
                                  for (let notification of this.notifications) {
                                    console.log('notification---', this.daysLeft(notification.lastUpdatedDate));
                                    notification.periodAgo = this.daysLeft(notification.lastUpdatedDate);
                                  }
                                  console.log(JSON.stringify(this.notifications) + "notification"); 
                                  
                                },
                                error => console.log("Error :: " + error)  
                            );
  }

  notificationRead() { //console.log(this.attendeeId+"---this.attendeeId");
    const notificationIds = ["5a98f4d698686723d8a7ec20","5a98f4d698686723d8a7ec21"];
    this._notificationService.updateNotificationStatus(notificationIds)
                             .subscribe(res=>
                                {
                                    res; console.log(res);     
                                },
                                error => console.log("Error :: " + error)  
                            );
  }
daysLeft(notifyDate){
    let today  = Date.now();
    let resultString = '';
    
    let sDate:any = new Date(notifyDate);
     //no.of daysdiff in hours
    let hoursDiff = today - Date.parse(sDate) ; 
    if (hoursDiff < 24) {
        resultString = hoursDiff + " hours ago";
    } else {
      //no.of daysdiff in days
       resultString = Math.floor((hoursDiff / 1000 / 60 / 60 /24) + 1) + ' days ago';
    }
    //console.log(resultString+"---resultString");
    return resultString;
 }

 gotoAgenda(visitId){
  this._notificationService.getCustFutureAndPastVisit(visitId, -1)
  .subscribe(res=>
            {
   console.log(JSON.stringify(res.data));
 });
 
}

}
