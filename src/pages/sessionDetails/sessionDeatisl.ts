import { Component, Input  } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { DataServiceProvider } from '../../providers/data-service';
import { securityQuestionPage } from '../securityQuestion/securityQuestion';
import  { NgbModal ,  NgbActiveModal, NgbTypeahead }  from  '@ng-bootstrap/ng-bootstrap';
import { prsenterRating } from './addattendeemodalcontent/prsenterRating';

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
  @Input() id;
   modalRef: any;
  constructor( public navParams: NavParams,public viewCtrl: ViewController , public navCtrl: NavController, private _dataservice :DataServiceProvider,private  modalService:  NgbModal) {
//  this.username=this.navParams.get("username");
 this.attendeeId   = sessionStorage.getItem("attendeeId");
 this.agendaData   = navParams.get('agendaData');
 this.visitDetails   = navParams.get('visitDetails');
 console.log('agenda',this.agendaData );
 console.log('visit',this.visitDetails);
 this.notification   = navParams.get('notification');
 console.log(this.notification,"location");
  }
  goBack(){
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
}

