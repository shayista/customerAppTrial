import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { DataServiceProvider } from '../../providers/data-service';
import { changePasswordPage } from '../changePasswordFirst/changePasswordFirst';
import { mainHeader } from '../mainHeader/mainHeader';


@Component({
  selector: 'page-securityQuestion',
  templateUrl: 'securityQuestion.html'
})
export class securityQuestionPage {
  attendeeId: any;
  securityQuestion: any;
  securityAnswer :any;
  constructor(public navParams: NavParams, public viewCtrl: ViewController, public navCtrl: NavController, private _dataservice: DataServiceProvider) {
    // this.username = this.navParams.get("username");
    this.attendeeId   = sessionStorage.getItem("attendeeId");
    console.log('uid', this.attendeeId);
  }
  logout() {
    this.navCtrl.push(loginPage);
      this.navCtrl.setRoot(loginPage).then(() =>{
      this.navCtrl.popToRoot();
      window.location.reload();
    });

  }
  goBack(){
    this.navCtrl.push(changePasswordPage);
  }
  
  securityQuestionSelected(question){
    this.securityQuestion = question.target.value;
    console.log( this.securityQuestion );
  }
  saveSecurityQuestion(){
    console.log('security qn and answer',this.securityQuestion + this.securityAnswer );
    let qnsAnsObj = { attendeeId : this.attendeeId, quesAns : {"Question":this.securityQuestion,"answer":this.securityAnswer } ,firstTimeLoginIn : 0};
    this._dataservice.updateUserQnsAns(qnsAnsObj)
        .subscribe(res => {
             console.log(res);
             if(res.status == 200){
              this.navCtrl.push(mainHeader);
             }
        }
        );
     
      
     }
}

