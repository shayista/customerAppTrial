import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { mainHeader } from '../mainHeader/mainHeader';
import { changePasswordPage } from '../changePasswordFirst/changePassword';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage implements OnInit {
  result: any;
  username: string;
  password: string;
 
  constructor(public navCtrl: NavController, public dataService: DataServiceProvider) {

  }

  ngOnInit() {

  }

  validUser(){

    if (this.username.length > 0 && this.password.length > 0) {
      this.dataService.validateUser(this.username, this.password)
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
    sessionStorage.setItem("attendeeId", userDetails.data.result._id);
    sessionStorage.setItem("attendeeName", userDetails.data.result.name);
    sessionStorage.setItem("attendeePath", userDetails.data.result.attendee_path);
    if(userDetails.data.valid){
   
    
      if (userDetails.data.result.firstTimeLoginIn == 0) {
        console.log(userDetails);
  
  
        this.navCtrl.push(mainHeader);
       
      } else {
      
            this.navCtrl.push(changePasswordPage);
      }
    }
    else
    {
      alert("Invalid credentials entered....");
  }
  }


}
