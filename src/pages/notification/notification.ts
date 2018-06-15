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
                                  this.notificationsRead   = res.data[1].read; 
                                  this.allNotification     = this.notificationsUnread.concat( this.notificationsRead);
                                  console.log(this.allNotification);
                                  this.notifications = this.allNotification;
                                  // this.notifications = this.notifications;
                                
                                  for (let notification of this.notifications) {
                                    //console.log(notification);
                                    this.notificationId.push(notification._id);
                                    notification.periodAgo = this.daysLeft(notification.lastUpdatedDate);
                                    
                                  }
                                  this.notificationId=[];
                                  console.log(this.notificationUnreadCount);                                   
                                },
                                error => console.log("Error :: " + error)  
                            );
  }


  daysLeft(notifyDate){
     let currentDate = new Date();
        let insertedDate = new Date(notifyDate);

        let dateDiff = this.diff_hours(currentDate, insertedDate);
        let result; 

        if (dateDiff.hrDiff < 1) {
            result = dateDiff.hrDiff + " minutes ago";
        } else if (dateDiff.hrDiff < 24) {
            result = dateDiff.hrDiff + " hours ago";
        } else if (dateDiff.hrDiff > 24 && dateDiff.hrDiff < 48 ) {
            result = "Yesterday at " + this.formatAMPM(insertedDate);
        } else if (dateDiff.dayDiff > 1) {
            result = dateDiff.dayDiff + " days ago";
        }
        
        return result;
  }

  public diff_hours(dt2, dt1) {
        var hrDiff = (dt2.getTime() - dt1.getTime()) / 1000;
            hrDiff /= (60 * 60);
        
    return {"hrDiff" : Math.abs(Math.round(hrDiff)), "dayDiff" : Math.abs(Math.round(hrDiff/24))}; 
  }

    public formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    } 

 gotoAgenda(notification) {
  //console.log(notification);
  
  this.navCtrl.push(sessionDetailsPage,{"notification":notification});
  if (notification.read_flag == 0) {
   this._notificationService.markAsRead(notification)
       .subscribe(res=>
            {
              this.getCustomerNotifications();
              console.log(JSON.stringify(res.data));
            
            });
  }
  this.getCustomerNotifications();
   
  }

}
