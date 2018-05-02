import { Component } from '@angular/core';
import { NavController, ViewController, Events } from 'ionic-angular';
import { loginPage } from '../login/login';
import { PopoverController } from 'ionic-angular';
import { NotificationService } from '../../providers/notification';
import { HomePage } from '../home/home';
import { rootModulePage } from '../rootModule/rootModule';

@Component({
  selector: 'page-notificationModule',
  templateUrl: 'notification.html'
})
export class notificationModulePage {
  attendeeId:string;
  notifications: any;
  notificationId = [];
  notificationUnreadCount = 0;
  
  constructor(public viewCtrl: ViewController , public navCtrl: NavController, private _notificationService: NotificationService,public popoverCtrl: PopoverController, public events: Events ) {
    if (sessionStorage.getItem("attendeeId") == "undefined") {
        this.navCtrl.push(loginPage);
    } else {
      this.attendeeId   = sessionStorage.getItem("attendeeId");
    }
  }
  
  ngOnInit() {
    this.getCustomerNotifications();
    //this.notificationRead();//don't use this
    this.events.publish("notificationUnreadCount", 0);
  }
  
  goBack() {
    this.navCtrl.pop();
   
  }
    
  getCustomerNotifications() { //console.log(this.attendeeId+"---this.attendeeId");
    this._notificationService.getCustomerNotifications(this.attendeeId)
                      .subscribe(res=>
                                {
                                  this.notifications= res.data.notifications; 
                               
                                  console.log(JSON.stringify(this.notifications[0]._id) + "notification"); 
                                  for (let notification of this.notifications) {
                                    console.log('notification---', this.daysLeft(notification.lastUpdatedDate));
                                    this.notificationId.push(notification._id);
                                    notification.periodAgo = this.daysLeft(notification.lastUpdatedDate);
                                    if(notification.read_flag == 0){
                                      this.notificationUnreadCount++;
                                    }
                                  }
                                  // console.log(this.notificationId); 
                                  
                                },
                                error => console.log("Error :: " + error)  
                            );
  }

  notificationRead() { //console.log(this.notificationId);
  
    this._notificationService.updateNotificationStatus(this.notificationId)
                             .subscribe(res=>
                                {
                                    res; console.log(res);
                                   this.markRead(res.data.nModified);
                                   document.getElementById('notification-icon').click();
                                         
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
markRead(x){
  console.log(x);
  if(x > 0) {
    document.getElementById('notification-list').classList.add("all-notificaitons-read");
    this.notificationUnreadCount = 0;
    this.events.publish("notificationUnreadCount", this.notificationUnreadCount);
  }
  

}


}
