import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DataServiceProvider } from '../../providers/data-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage implements OnInit{
result:any;
username:string;
password:string;

  constructor(public navCtrl: NavController,public dataService : DataServiceProvider) { 
   
   }

  ngOnInit(){
    
  }


  // getUserDetails(){ 
  //   this.dataService.getUser()
  //                   .subscribe(res=> 
  //                                 {
  //                                     this.result = res; 
  //                                     console.log(res);                                          ;
  //                                 },
  //                               error => console.log("Error :: " + error)  
  //                             );

  // }

  validUser() {
    
      if(this.username.length > 0 && this.password.length > 0){
          this.dataService.validateUser(this.username, this.password)
                          .subscribe(res=> 
                                        {
                                          this.navigateUser(res);                                          ;
                                        },
                                      error => console.error("Error :: " + error)  
                                    );
      } else {
          alert("Please enter username and password...");
      }
  }

  navigateUser(userDetails) { 
    if (userDetails.data.valid) {
        //console.log(userDetails);
        sessionStorage.setItem("attendeeId", userDetails.data.result._id);
        sessionStorage.setItem("attendeeName", userDetails.data.result.name);
        sessionStorage.setItem("attendeePath", userDetails.data.result.attendee_path);
        this.navCtrl.push(HomePage);
    } else {
       alert("Invalid credentials entered....");
    }
  }

  
}
