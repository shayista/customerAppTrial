import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { DataServiceProvider } from '../../providers/data-service';
import { mainHeader } from '../mainHeader/mainHeader';
import { Input } from '@angular/core/src/metadata/directives';
import { StateKey } from '@angular/platform-browser/src/browser/transfer_state';



@Component({
  selector: 'page-profileDetails',
  templateUrl: 'profileDetials.html'
})
export class profileDetailsPage {
  attendeeDetails: any;
  attendeeId:any;
  editOption: boolean =false;
  attendeeName: any;
  email: any;
  attendeeTel: any;
  securityAnswer: any;
  securityQuestion: any;
  profileEdit={
    'attendeeId'  :"",
    'client_Id'     : "",
    'name'          : "",
    'quesAns'       : {
      "Question":"",
      "answer":""
    },
    'email'         : "",
    'contactNumber' : "",
    'userUrl'       : "",
  }
  constructor( public navParams: NavParams,public viewCtrl: ViewController , public navCtrl: NavController, private _dataservice :DataServiceProvider) {
//  this.username=this.navParams.get("username");
this.attendeeId      = sessionStorage.getItem("attendeeId");
this.attendeeDetails = JSON.parse(sessionStorage.getItem("attendeeDetails"));

 console.log(this.attendeeDetails);

  }
 
  goBack(){
    this.navCtrl.pop();
    console.log(this.editOption);
  }
  enableEdit(){
    
    if( !this.editOption){
    
    var saveEdit =  document.getElementById("editOption").innerHTML="Save";
    var inputTangs = document.getElementsByTagName("input");

    var i;
    for (i = 0; i < inputTangs.length; i++) {
      inputTangs[i].style.backgroundColor = "#fff";
    }
    this.editOption = true;
    }
    else{
      this.profileEdit.attendeeId = this.attendeeId;
      this.profileEdit.client_Id = this.attendeeDetails.client_Id;
      this.profileEdit.name = this.attendeeName;
      this.profileEdit.email = this.email;
      this.profileEdit.contactNumber = this.attendeeTel;
      this.profileEdit.quesAns.Question = this.securityQuestion;
      this.profileEdit.quesAns.answer = this.securityAnswer;
      this.profileEdit.userUrl = this.email;
      console.log(this.profileEdit);
      
    this._dataservice.updateProfile(this.profileEdit).subscribe(
      res =>{
               console.log(res);
               if(res.status == 200){
                 
      sessionStorage.setItem("attendeeId", res.data._id);
      sessionStorage.setItem("attendeeName", res.data.name);
      sessionStorage.setItem("attendeePath", res.data.attendee_path);
      sessionStorage.setItem("attendeeDetails", JSON.stringify(res.data));
               }
            }


);
      this.editOption = false;
      saveEdit =  document.getElementById("editOption").innerHTML="Edit";
      var inputTangs = document.getElementsByTagName("input");
      var i;
      for (i = 0; i < inputTangs.length; i++) {
        inputTangs[i].style.backgroundColor = "#f1f0f0";
      }
    }
  
  }
  
}

