import { Component,Input } from '@angular/core';
import { NavController, ViewController, App, Events, NavParams, MenuController  } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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
  getCustomerNotifications() { 
    console.log(this.attendeeId+"---this.attendeeId");
    this._notificationService.getCustomerNotifications(this.attendeeId)
      .subscribe(res=>
                {
                  console.log(res);
                  this.notifications= res.data; 
                  for (let notification of this.notifications[0].unread) {
                    if(notification.read_flag == 0){
                      this.notificationUnreadCount++;
                    }
                    else{
                      this.notificationUnreadCount=0;
                    }
                  }
                },
                error => console.log("Error :: " + error)  
            );
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
}

