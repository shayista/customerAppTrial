import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { mainHeader } from '../mainHeader/mainHeader';
import { changePasswordPage } from '../changePasswordFirst/changePasswordFirst';
import { ForgotPasswordPage } from '../forgotPassword/forgotPassword';

import { ChatAdapter } from 'ng-chat';
import { SocketIOAdapter } from './socketio-adapter';
import { Socket } from 'ng-socket-io';
import { Http } from '@angular/http';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage implements OnInit {
  result: any;
  username: string;
  password: string;
 
  // public EMAIL_REGEX = `.*^[a-zA-Z0–9_.+-]+@[a-zA-Z0–9-]+.[a-zA-Z0–9-.]+$.*`
  constructor(public navCtrl: NavController, public _dataService: DataServiceProvider,private socket: Socket, private http: Http) {
    document.getElementById('instantChat').style.display = "none";
  }

  ngOnInit() {

  }

  validUser() {

    if (this.username.length > 0 && this.password.length > 0) {
      this._dataService.validateUser(this.username, this.password)
        .subscribe(res => {
          console.log(res);
          this.navigateUser(res);
          
        },
        error => console.log(error)
        );
    } else {
      alert("Please enter username and password...");
    }
  }

navigateUser(userDetails) {
  console.log("userdeytails");

    if (userDetails.data.valid) {

      sessionStorage.setItem("attendeeId", userDetails.data.result._id);
      sessionStorage.setItem("attendeeName", userDetails.data.result.name);
      sessionStorage.setItem("attendeePath", userDetails.data.result.attendee_path);
      sessionStorage.setItem("attendeeDetails", JSON.stringify(userDetails.data.result));

      this.joinRoom(userDetails.data.result.name,userDetails.data.result._id);

      if (userDetails.data.result.firstTimeLoginIn == 0) {
        console.log("kjfbnlif;gbk'hpn");
        this.navCtrl.push(mainHeader);
      } else {
            this.navCtrl.push(changePasswordPage);
      }
    }
    else {
      console.log("kjfbnlif;gbk'hpn");
      alert("Invalid credentials entered....");
    }
  }
  forgotPassword(){
   
   this.navCtrl.push(ForgotPasswordPage,{"email": this.username});
}
public adapter : ChatAdapter;
public InitializeSocketListerners(userDetails): void
{
    console.log('login Component');
    let userId = userDetails.data.result._id;
    this.socket.on("generatedUserId", (userId) => {
        // Initializing the chat with the userId and the adapter with the socket instance
        this.adapter = new SocketIOAdapter(userId, this.socket, this.http);
    });
    this.joinRoom(userDetails.name,userDetails._id);
}

public joinRoom(username,userId): void 
{
    this.socket.emit("join", username , userId);
}
}
