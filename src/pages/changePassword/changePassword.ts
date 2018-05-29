import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { DataServiceProvider } from '../../providers/data-service';
import { mainHeader } from '../mainHeader/mainHeader';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';


@Component({
  selector: 'page-changePassword',
  templateUrl: 'changePassword.html'
})
export class changePasswordProfilePage {
  attendeeId: any;
  password: any;
  reenterPassword: any;
  oldPassword: any;
  public barLabel: string;
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  constructor(public navParams: NavParams, public viewCtrl: ViewController, public navCtrl: NavController, private _dataservice: DataServiceProvider) {
    //  this.username=this.navParams.get("username");
    this.attendeeId = sessionStorage.getItem("attendeeId");
    console.log('uid', this.attendeeId);
  }
  goBack() {
    this.navCtrl.pop();
  }
  changePassword() {
    console.log(this.password);
    console.log(this.reenterPassword);

    if (this.password == this.reenterPassword) {

      let changepasswordObj = { "attendeeId": this.attendeeId, "oldPassword": this.oldPassword, "updatedPassword": this.password };
      this._dataservice.changePassword(changepasswordObj)
        .subscribe(res => {
          res;
          console.log('result body for updatepassword', res);
          if (res.data.nModified == 0) {
            alert("Old Password Incorrect");
            this.navCtrl.push(changePasswordProfilePage);
          }
          else {
            this.navCtrl.push(mainHeader);
          }
        }
        );

    }
    else {
      alert("paswword doesnt match");
    }

  }
  skip() {
    this.navCtrl.push(mainHeader);
  }

  passwordValidator() {
    this.barLabel = '';

  }

}

