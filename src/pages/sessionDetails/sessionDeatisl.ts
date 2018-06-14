import { Component, Input  } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { DataServiceProvider } from '../../providers/data-service';
import { securityQuestionPage } from '../securityQuestion/securityQuestion';
import  { NgbModal ,  NgbActiveModal, NgbTypeahead }  from  '@ng-bootstrap/ng-bootstrap';
import { prsenterRating } from './addattendeemodalcontent/prsenterRating';
import { notificationModulePage } from '../notification/notification';

@Component({
  selector: 'page-sessionDetails',
  templateUrl: 'sessionDetails.html'
})
export class sessionDetailsPage {
  agendaData: any;
  attendeeId:any;
  password: any;
  reenterPassword: any;
  visitDetails: any;
  notification : any;
  resData: any;
  agendaDataFeteched : any;
  @Input() id;
   modalRef: any;

  constructor( public navParams: NavParams,public viewCtrl: ViewController , public navCtrl: NavController, private _dataservice :DataServiceProvider,private  modalService:  NgbModal) {
    //  this.username=this.navParams.get("username");
    this.attendeeId   = sessionStorage.getItem("attendeeId");
    this.agendaData   = navParams.get('agendaData');
    this.visitDetails = navParams.get('visitDetails');
    this.notification = navParams.get('notification');

    if( this.agendaData ) {
      console.log("clicked");
      this.agendaData = this.agendaData;
    } else {
      //console.log(this.notification.visitId,"===notifictaion");
        this.getVisitAgendas(this.notification);
    }
    console.log(this.notification,"location");
  }

  goBack() {
      this.navCtrl.pop();
  }
  openModal(purpose,agenda) {
    console.log(purpose);
    console.log(agenda);
    this.modalRef  =  this.modalService.open(prsenterRating);
    this.modalRef.componentInstance.resData = agenda;
    this.modalRef.componentInstance.visitPurpose = purpose;
    // this.modalRef.componentInstance.attendeeEmit.subscribe(($e) => {
    //   console.log($e + "----parent create");
    
    //   //  console.log(this.selectedAttObj);
    // });
  }

  getVisitAgendas(notification) {
    //console.log(visitId);    
    this._dataservice.getCustVisitAgendas(notification.visitId)
        .subscribe(
          res => {
            if (res.data.length > 0) {
              this.agendaData   = res.data[0].records[0];
              this.visitDetails = {
                'purpose' : notification.title
              };
              console.log(this.agendaData,"===this.agendaData");
            } else {
              this.agendaData = '';
          
            }
          },
          error => console.log("Error :: " + error)
    ); 
  }
}

