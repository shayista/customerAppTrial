import { Component } from '@angular/core';
import { NavController, ViewController, Events, LoadingController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { PopoverController } from 'ionic-angular';
import { NotificationService } from '../../providers/notification';
import { HomePage } from '../home/home';
import { rootModulePage } from '../rootModule/rootModule';
import { sessionDetailsPage } from '../sessionDetails/sessionDeatisl';

@Component({
  selector: 'page-notificationModule',
  templateUrl: 'notification.html'
})
export class notificationModulePage {
  attendeeId:string;
  notifications: any[]=[];
  notificationId = [];
  notificationUnreadCount = 0;
  notificationsUnread : any[] =[];
  notificationsRead : any[] =[];
  allNotification : any[];
  constructor(public viewCtrl: ViewController , public navCtrl: NavController, private _notificationService: NotificationService,public popoverCtrl: PopoverController, public events: Events, public loadingCtrl: LoadingController ) {
    if (sessionStorage.getItem("attendeeId") == "undefined") {
        this.navCtrl.push(loginPage);
    } else {
      this.attendeeId   = sessionStorage.getItem("attendeeId");
    }
  }
  
  ngOnInit() {
   this.ionViewLoaded();
  }
  ionViewLoaded() {
    var loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      // content: `
      // <ion-spinner icon="bubbles"></ion-spinner>`,
      duration: 5000
    });

  
    loading.present().then(() => {
      console.log("data")
      this.getCustomerNotifications();
      //this.notificationRead();//don't use this
      this.events.publish("notificationUnreadCount", 0);
      loading.dismiss();
    });
  

  }
  goBack() {
    this.navCtrl.pop();
   
  }
    
  getCustomerNotifications() { //console.log(this.attendeeId+"---this.attendeeId");
    this._notificationService.getCustomerNotifications(this.attendeeId)
                      .subscribe(res=>
                                {
                                  console.log(res);
                                  this.notificationsUnread = res.data[0].unread; 
                                  this.notificationsRead = res.data[1].read; 
                                   this.allNotification = this.notificationsUnread.concat( this.notificationsRead);
                                   console.log(this.allNotification);
                                  this.notifications = this.allNotification;
                                  this.notifications = this.notifications.sort();
                                    for (let notification of this.notifications) {
                                    console.log(notification);
                                  
                                   this.notificationId.push(notification._id);
                                   notification.periodAgo = this.daysLeft(notification.lastUpdatedDate);
                                  
                                 }
                                 console.log(this.notificationUnreadCount); 
                                  
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
    return resultString;
 }

 gotoAgenda(notification){
  this.getCustomerNotifications() //console.log(this.attendeeId+"---this.attendeeId");

   this.navCtrl.push(sessionDetailsPage,{"notification":notification});
   console.log(notification);
//    this._notificationService.markAsRead(notification)
//   .subscribe(res=>
//             {
//    console.log(JSON.stringify(res.data));
//  });
}

}
