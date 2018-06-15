import { Component,Input } from '@angular/core';
import { NavController, ViewController, App, Events, NavParams, MenuController  } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { loginPage } from '../login/login';
import { MyVisitPage } from '../my-visit/my-visit';
import { PopoverController } from 'ionic-angular';
import { rootModulePage } from '../rootModule/rootModule';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DataServiceProvider } from '../../providers/data-service';
import { NotificationService } from '../../providers/notification';
import { notificationModulePage } from '../notification/notification';
import { HomePage } from '../home/home';
import { changePasswordProfilePage } from '../changePassword/changePassword'; 
import { profileDetailsPage } from '../profile/profileDetials';

@Component({
  selector: 'page-mainHeader',
  templateUrl: 'mainHeader.html'
})
export class mainHeader implements OnInit{
    home:any ;
    notificationsPage:any = notificationModulePage;
    pageNavigation: any;
    attendeeId:string;
    notifications: any;
    notificationId = [];
    notificationUnreadCount=0;
    myIndex: number;
    changePassword:boolean=false;
    menuPage = rootModulePage;
    imageAttendee: any;
    notificationsUnread : any[] =[];
    notificationsRead : any[] =[];
    allNotification : any[];
    //@Input() notificationUnreadCount=0;  
    
  constructor(public navCtrl: NavController ,private _notificationService: NotificationService, public popoverCtrl: PopoverController, public viewCtrl: ViewController,
    public appCtrl: App, public events: Events,public navParams: NavParams,menu: MenuController,public loadingCtrl: LoadingController) {
      menu.enable(true);
  
      if (sessionStorage.getItem("attendeeId") == "undefined") {
        this.navCtrl.push(loginPage);
    } else {
      this.home = HomePage;
      this.attendeeId   = sessionStorage.getItem("attendeeName");

    }

  }

  ngOnInit() {    
   this.ionViewLoaded();
    console.log('Home Page called');
    // this.pageNavigation = this.home;
  }
  ionViewLoaded() {
    var loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000
    });

  
    loading.present().then(() => {
      this.getCustomerNotifications();
      this.imageAttendee = sessionStorage.getItem("attendeePath");
      loading.dismiss();
    });
  

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
      
      presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(rootModulePage);
        popover.present({
          ev: myEvent
        });
      }
      notificationPopover() {
      this.navCtrl.push(notificationModulePage);
        this.getCustomerNotifications();
      }
      goBack(){
 
        this.getCustomerNotifications();
      }
      goToForgotPassword(){
        this.navCtrl.push(changePasswordProfilePage);
      }
      goToProfile(){
        this.navCtrl.push(profileDetailsPage);
      }
      logout(){
        this.navCtrl.push(loginPage);
        this.navCtrl.setRoot(loginPage).then(() =>{
        this.navCtrl.popToRoot();
        window.location.reload();
      });
      }
      openChatInstant(){
         document.getElementById('instantChat').style.display = "block";
      }

      

      openChat() {

        this.navCtrl.push(Chat, { "user": sessionStorage.getItem("attendeeName") });

      }
}

