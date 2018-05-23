import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { mainHeader } from '../mainHeader/mainHeader';
import { changePasswordPage } from '../changePasswordFirst/changePassword';
import { ForgotPasswordPage } from '../forgotPassword/forgotPassword';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage implements OnInit {
  result: any;
  username: string;
  password: string;

  constructor(public navCtrl: NavController, public _dataService: DataServiceProvider) {

  }

  ngOnInit() {

  }

  validUser() {

    if (this.username.length > 0 && this.password.length > 0) {
      this._dataService.validateUser(this.username, this.password)
        .subscribe(res => {
          console.log(res)
          this.navigateUser(res);
          
        },
        error => console.log(error)
        );
    } else {
      alert("Please enter username and password...");
    }
  }

  navigateUser(userDetails) {

    if (userDetails.data.valid) {

      sessionStorage.setItem("attendeeId", userDetails.data.result._id);
      sessionStorage.setItem("attendeeName", userDetails.data.result.name);
      sessionStorage.setItem("attendeePath", userDetails.data.result.attendee_path);
      sessionStorage.setItem("attendeeDetails", JSON.stringify(userDetails.data.result));
      if (userDetails.data.result.firstTimeLoginIn == 0) {
        //console.log(userDetails);
        this.navCtrl.push(mainHeader);
      } else {
            this.navCtrl.push(changePasswordPage);
      }
    }
    else {
      alert("Invalid credentials entered....");
    }
  }
  forgotPassword(){
   
   this.navCtrl.push(ForgotPasswordPage,{"email": this.username});
}
}
