import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { DataServiceProvider } from '../../providers/data-service';
import { changePasswordPage } from '../changePasswordFirst/changePassword';
import { mainHeader } from '../mainHeader/mainHeader';
import { changePasswordProfilePage } from '../changePassword/changePassword';


@Component({
  selector: 'page-ForgotPassword',
  templateUrl: 'forgotPassword.html'
})
export class ForgotPasswordPage {
  attendeeId: any;
  securityQuestion: any;
  securityQuestionFetched: any;
  securityAnswerFetched : any;
  securityAnswer :any;
  email: any;
  constructor(public navParams: NavParams, public viewCtrl: ViewController, public navCtrl: NavController, private _dataservice: DataServiceProvider) {
    this.email = this.navParams.get("email");
   
    this._dataservice.forgotPassword(this.email).subscribe(res=>{
      console.log(res);
      this.forgotPasswordValidation(res);
    });
    console.log('uid',  this.email);
  }
  logout() {
  
      this.navCtrl.setRoot(loginPage).then(() =>{
      this.navCtrl.popToRoot();
      window.location.reload();
    });

  }
  goBack(){
     
    this.navCtrl.setRoot(loginPage).then(() =>{
      this.navCtrl.popToRoot();
      window.location.reload();
    });
  }
  
  forgotPasswordValidation(forgotPasswordDetails){
    console.log(forgotPasswordDetails.data[0].quesAns);
    this.securityQuestionFetched = forgotPasswordDetails.data[0].quesAns.Question ;
    this.securityAnswerFetched = forgotPasswordDetails.data[0].quesAns.answer ;
  console.log(this.securityAnswerFetched );


  }
  SecurityQuestion(f){
    console.log(this.securityAnswer );
    if(this.securityAnswerFetched == this.securityAnswer ){
      this.navCtrl.push(changePasswordProfilePage);
    }
    else{
      alert("Invalid Answer");
      }
  }  
}

