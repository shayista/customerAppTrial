import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { MyVisitPage } from '../my-visit/my-visit';
import { PopoverController } from 'ionic-angular';
import { rootModulePage } from '../rootModule/rootModule';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DataServiceProvider } from '../../providers/data-service';
import { sessionFeedbackPage } from '../sessionFeedback/sessionFeedback';
import { Chat } from '../chat/chat';
import { commentPage } from '../comments/comments';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  attendeeDeatils: any;
  FeedbackFlag: boolean = false;
  daysRemaining: any = null;
  firstVisit: any;
  pastVisits: Array<Object> = [];
  visitStatus: boolean;
  pageNavigation: any;
  flagData: any;
  attendeeId: any;
  attendees: any = [];
 
  toUser: { toUserId: string, toUserName: string };
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private _dataservice: DataServiceProvider, public loadingCtrl: LoadingController) {
    //document.getElementById('instantChat').style.display = "block";
    document.getElementById('chatBot').setAttribute("style", "display:block");
    if (sessionStorage.getItem("attendeeId") == "undefined") {
      this.navCtrl.push(loginPage);
    }
    else {

      this.attendeeId = sessionStorage.getItem("attendeeId");

    }

  }
ionViewLoaded() {
    var loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      // content: `
      // <ion-spinner icon="crescent" ></ion-spinner>`,
      duration: 5000
    });

  
    loading.present().then(() => {
      console.log("data")
      this.getCustlatestVisit();
      this.getCustPastVisit();
 
      loading.dismiss();
    });
  

  }
  ngOnInit() {
      // this.getCustlatestVisit();
      // this.getCustPastVisit();
   
      this.ionViewLoaded();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  

  getCustlatestVisit() {

    this._dataservice.getCustFutureAndPastVisit(sessionStorage.getItem("attendeeId"), 1)
      .subscribe(res => {
       this.processFutureVisit(res.data);
        console.log(res);

      },
      error => console.log("Error :: " + error)
      );
  }

  processFutureVisit(futureVisits) {


    if (futureVisits.length > 0) {
      this.visitStatus = true;
      this.firstVisit = futureVisits[0];
      for (let x of futureVisits[0].visit_attendees) {
        this.attendees.push(x.name);
        console.log(this.attendees);
      }
      this.firstVisit.startSuperScript = this.daysSuperScript(futureVisits[0].startDate);
      this.firstVisit.endSuperScript = this.daysSuperScript(futureVisits[0].endDate);
      //No.of Days visit
      let noOfDays = this.dateDifference(futureVisits[0].startDate, futureVisits[0].endDate);

      this.firstVisit.noOfDays = noOfDays;

      //days remaining
      let daysRemained = Math.floor(this.dateDifference(new Date().toUTCString(), futureVisits[0].startDate));

      switch (true) {
        case daysRemained <= 0: this.daysRemaining = "Ongoing"; break;
        //case daysRemained == 0 : this.daysRemaining = "Today"; break;
        case daysRemained == 1: this.daysRemaining = "Tomorrow"; break;
        default: this.daysRemaining = daysRemained + " Days Left"; break;
      }
      //console.log(JSON.stringify(this.firstVisit) + "--futurevisits");
    } else {


      this.visitStatus = false;

    }
  }

  daysSuperScript(sDate) {
    var dateSuperScript = "th";
    var last = (new Date(sDate).getDate()) / 10;

    var end = (new Date(sDate).getDate()) % 10;
    if (Math.floor(last) == 1) {
      end = 4;
    }


    switch (end) {
      case 1: dateSuperScript = "st"; break;
      case 2: dateSuperScript = "nd"; break;
      case 3: dateSuperScript = "rd"; break;
      default: dateSuperScript = "th"; break;
    }
    return dateSuperScript;
  }

  getCustPastVisit() {
  
    this._dataservice.getCustFutureAndPastVisit(sessionStorage.getItem("attendeeId"), 0)
      .subscribe(res => {

        this.pastVisits = this.processPastVisits(res.data);
       // console.log(JSON.parse(this.pastVisits)+ "blah");

      },
      error => console.log("Error :: " + error)
      );


  }
    
  processPastVisits(pastVisits) {
    let visitsLists: Array<Object> = [];
   // console.log(JSON.parse(pastVisits) + "--pastVisits");
    if (pastVisits.length > 0) {
  
      for (let visit of pastVisits) {
        console.log(visit, "---visit");
        //Superscript CAlculation
        visit.startSuperScript = this.daysSuperScript(visit.startDate);
        visit.endSuperScript = this.daysSuperScript(visit.endDate);
        // //No.of Days visit
        visit.noOfDays = this.dateDifference(visit.startDate, visit.endDate);
        // provide feedback
     
        visitsLists.push(visit);
    
      }
      //console.log(JSON.stringify(visitsLists)+"---visitsLists");
    } else {

      this.visitStatus = false;
    }
    return visitsLists;

  }

  dateDifference(startDate, endDate) {

    let sDate: any = new Date(startDate);
    let eDate: any = new Date(endDate);
    //no.of daysdiff in hours
    let daysDiff = Date.parse(eDate) - Date.parse(sDate);
    //no.of daysdiff in days
    let inDays = (daysDiff / 1000 / 60 / 60 / 24) + 1;

    return inDays;

  }

  goToAgenda(visitId, visitDetails) {
    //this.pageNavigation = MyVisitPage;
    this.navCtrl.push(MyVisitPage, { "visitId": visitId, "visitDetails": visitDetails });
  }

  goToSessionFeedback(visitId) {
    if(visitId.feedback == null){
           this.navCtrl.push(sessionFeedbackPage, { "visitId": visitId });
    } else {
   
      this.navCtrl.push(commentPage, {"visitId":visitId});
      
    }
    
  }

}

