import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { DataServiceProvider } from '../../providers/data-service';


@Component({
  selector: 'page-sessionFeedback',
  templateUrl: 'sessionFeedback.html'
})
export class sessionFeedbackPage {
  additionalCommentsText : string;
  attendee:any;
    customerFeedback = {
    visitId:"",
    attendeeId:"",
    contentQuality:"",
    presentationSkills:"",
    cabServices:"",
    hotelServices:"",
    fbServices:"",
    overallRating:"",
    additionalComments:""
};
val:number=0;
visitId: any;

  constructor( public navParams: NavParams,public viewCtrl: ViewController , public navCtrl: NavController, private dataservice :DataServiceProvider) {
    this.visitId = navParams.get('visitId');
    if (sessionStorage.getItem("attendeeId") == "undefined") {
      this.navCtrl.setRoot(loginPage);
      this.navCtrl.push(loginPage);
    } else {
      this.attendee = sessionStorage.getItem("attendeeId");
    
    }
  }
  rangeCal(value){
   
 let min=1;
 let max=100;
  this.val = (value.target.value - min) / (max - min);
 console.log(this.val);
 var sliderName =value.target.id;

 document.getElementById(sliderName).style.backgroundImage=
 '-webkit-gradient(linear, left top, right top, '
 + 'color-stop(' + this.val + ', rgb(100, 167, 11)), '
  + 'color-stop(' + this.val  + ', #C5C5C5)'
 + ')'
 

for(let i=0;i<6;i++){

  let sliderCounter= "slider"+i;
  var sliderName =value.target.id;
 
  if(sliderName == sliderCounter){
 
  switch(i){
    case 0:
    this.customerFeedback.contentQuality=(Math.ceil(value.target.value/10)).toString();
    break;
    case 1:
    this.customerFeedback.presentationSkills= (Math.ceil(value.target.value/10)).toString() ;
    break;
    case 2:
    this.customerFeedback.cabServices= (Math.ceil(value.target.value/10)).toString() ;
    break;
    case 3:
    this.customerFeedback.hotelServices= (Math.ceil(value.target.value/10)).toString() ;
    break;
    case 4:
    this.customerFeedback.fbServices= (Math.ceil(value.target.value/10)).toString() ;
    break;
    case 5:
    this.customerFeedback.overallRating= (Math.ceil(value.target.value/10)).toString() ;
    break;
  }

  }
  // console.log(this.additionalCommentsText);
}
this.customerFeedback.visitId=this.visitId;
this.customerFeedback.attendeeId = this.attendee;


console.log(this.customerFeedback);




}
sessionFeedBackForm(){
  this.customerFeedback.additionalComments = this.additionalCommentsText;
this.dataservice.saveCustomerFeedback(this.customerFeedback)
.subscribe(res => {
  console.log(res);
  // res;
  if(res.status ==200){
    this.navCtrl.pop();
  }
 
},
error => console.log( error));

}
goBack(){
  this.navCtrl.pop();
}

}

